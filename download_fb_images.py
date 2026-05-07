"""
Download Facebook images with full token URLs.
Facebook CDN images require the complete URL with query params (tokens).
We scrape those full URLs and download with urllib (no extra deps).
"""
import os
import re
import json
import urllib.request
import urllib.error
from scrapling.fetchers import StealthyFetcher

def main():
    print("Step 1: Fetching Facebook page with Scrapling...")
    p = StealthyFetcher.fetch('https://www.facebook.com/trattoriatrium', solve_cloudflare=True)
    
    html = p.body.decode('utf-8', errors='ignore') if hasattr(p, 'body') else ''
    print(f"Got HTML: {len(html)} bytes")
    
    # Facebook embeds full image URLs with tokens in the HTML
    # They look like: https://scontent...fbcdn.net/v/...jpg?...oh=...&oe=...
    # We need the FULL URL including query string
    pattern = r'https://scontent[^"\s\\]+\.jpg[^"\s\\]*'
    raw_matches = re.findall(pattern, html)
    
    # Clean up escaped characters from JSON-encoded HTML
    cleaned = []
    for url in raw_matches:
        url = url.replace('\\/', '/')
        url = url.replace('&amp;', '&')
        # Filter for actual content images (not tiny icons)
        if '_n.jpg' in url or 's960x960' in url or 's720x720' in url:
            cleaned.append(url)
    
    unique_urls = list(dict.fromkeys(cleaned))  # deduplicate preserving order
    print(f"Found {len(unique_urls)} unique image URLs with tokens")
    
    # Save the full URLs for reference
    with open('fb_urls_with_tokens.json', 'w') as f:
        json.dump(unique_urls, f, indent=2)
    
    output_dir = os.path.join('public', 'images', 'social')
    os.makedirs(output_dir, exist_ok=True)
    
    downloaded = 0
    max_images = 8
    
    for url in unique_urls:
        if downloaded >= max_images:
            break
        
        filepath = os.path.join(output_dir, f'{downloaded + 1}.jpg')
        try:
            print(f"  Downloading image {downloaded + 1}...")
            req = urllib.request.Request(url, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                'Referer': 'https://www.facebook.com/',
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
            })
            resp = urllib.request.urlopen(req, timeout=15)
            data = resp.read()
            
            if len(data) > 5000:  # Must be a real image, not error page
                with open(filepath, 'wb') as f:
                    f.write(data)
                print(f"  [OK] Saved {filepath} ({len(data)} bytes)")
                downloaded += 1
            else:
                print(f"  [SKIP] Too small ({len(data)} bytes), skipping")
        except urllib.error.HTTPError as e:
            print(f"  [FAIL] HTTP {e.code}: {e.reason}")
        except Exception as e:
            print(f"  [FAIL] Error: {e}")
    
    print(f"\nDone! Downloaded {downloaded}/{max_images} images to {output_dir}/")

if __name__ == '__main__':
    main()
