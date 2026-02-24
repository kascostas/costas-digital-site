import requests,re
u='https://lobsterbands.com'
html=requests.get(u,timeout=20).text
print('len',len(html))
for m in re.findall(r'https?://[^"\']+',html):
    if any(k in m.lower() for k in ['lobster','api','docs','github']):
        print(m)
print('---scripts---')
for s in re.findall(r'<script[^>]+src=["\']([^"\']+)',html,re.I):
    print(s)
