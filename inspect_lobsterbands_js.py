import requests,re
js=requests.get('https://lobsterbands.com/assets/index-CJc2OUBB.js',timeout=30).text
print('len',len(js))
for pat in ['api','token','openapi','swagger','actions','endpoint','https://','http://','lobsterbands']:
    print(pat, js.lower().find(pat))
# print URLs
urls=sorted(set(re.findall(r'https?://[^"\'\s)]+',js)))
print('urls',len(urls))
for u in urls[:200]:
    print(u)
# print strings with /api/
for m in sorted(set(re.findall(r'/[A-Za-z0-9_\-/.]*api[A-Za-z0-9_\-/.]*',js))):
    print('path',m)
