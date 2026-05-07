import os
import re
from scrapling.fetchers import StealthyFetcher

def main():
    print("Fetching Facebook page to get fresh URLs...")
    p = StealthyFetcher.fetch('https://www.facebook.com/trattoriatrium', solve_cloudflare=True)
    
    html = ''
    if hasattr(p, 'body'):
        html = p.body.decode('utf-8', errors='ignore')
    elif hasattr(p, 'text'):
        html = p.text
    elif hasattr(p, 'html'):
        html = p.html
        
    imgs = re.findall(r'https://[^\s\"\']+\.jpg', html)
    fbcdn_imgs = [i.replace('\\/', '/') for i in imgs if 'fbcdn.net' in i]
    
    # Filter for good images
    good_imgs = list(set([i for i in fbcdn_imgs if '_n.jpg' in i or 'fbcdn.net/v/' in i]))
    
    print(f"Found {len(good_imgs)} images. Downloading the first 8...")
    
    output_dir = 'public/images/social'
    os.makedirs(output_dir, exist_ok=True)
    
    downloaded = 0
    for i, url in enumerate(good_imgs):
        if downloaded >= 8:
            break
        try:
            print(f"Downloading {url[:50]}...")
            # We must use StealthyFetcher or a custom request to bypass basic blocks
            resp = StealthyFetcher.fetch(url, method='GET')
            if hasattr(resp, 'body') and len(resp.body) > 1000:
                with open(f"{output_dir}/{downloaded+1}.jpg", 'wb') as f:
                    f.write(resp.body)
                print(f"Saved {downloaded+1}.jpg")
                downloaded += 1
            elif hasattr(resp, 'content') and len(resp.content) > 1000:
                with open(f"{output_dir}/{downloaded+1}.jpg", 'wb') as f:
                    f.write(resp.content)
                print(f"Saved {downloaded+1}.jpg")
                downloaded += 1
            else:
                print("Failed to get body")
        except Exception as e:
            print(f"Failed: {e}")
            
    print(f"Done downloading {downloaded} images.")

if __name__ == '__main__':
    main()
