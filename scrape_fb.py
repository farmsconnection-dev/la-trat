from scrapling.fetchers import StealthyFetcher
import re
import json

def main():
    print("Fetching Facebook page...")
    p = StealthyFetcher.fetch('https://www.facebook.com/trattoriatrium', solve_cloudflare=True)
    
    html = ''
    if hasattr(p, 'body'):
        html = p.body.decode('utf-8', errors='ignore')
    elif hasattr(p, 'text'):
        html = p.text
    elif hasattr(p, 'html'):
        html = p.html
        
    print(f"Got HTML, length: {len(html)}")
    
    # Facebook image URLs often look like https://scontent...fbcdn.net...
    # We use a broad regex for URLs ending in .jpg
    imgs = re.findall(r'https://[^\s\"\']+\.jpg', html)
    fbcdn_imgs = [i for i in imgs if 'fbcdn.net' in i]
    
    # filter for likely post images (often contain _n.jpg)
    good_imgs = list(set([i for i in fbcdn_imgs if '_n.jpg' in i or 'fbcdn.net/v/' in i]))
    
    with open('social-output.json', 'w') as f:
        json.dump(good_imgs, f, indent=2)
        
    print(f"Saved {len(good_imgs)} images to social-output.json")

if __name__ == '__main__':
    main()
