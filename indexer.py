import os
import json
from datetime import datetime

base_path = './www/'
kbs = ['kb/Journal', 'kb/Legende', 'kb/Regeln', 'tools']

for kb in kbs:
    index = []
    kb_path = os.path.join(base_path, kb)
    for root, dirs, files in os.walk(kb_path):
        dirs[:] = [d for d in dirs if not d.endswith('.obsidian')]
        for file in files:
            if file.endswith('.md') or file.endswith('.html'):
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, kb_path).replace('\\', '/')
                title = os.path.splitext(os.path.basename(file_path))[0]
                last = int(os.path.getmtime(file_path))
                last_readable = datetime.fromtimestamp(last).strftime('%Y-%m-%d %H:%M:%S')
                entry = {'id': rel_path, 'title': title, 'last': last, 'last_readable': last_readable}
                index.append(entry)
    index_file = os.path.join(kb_path, 'kb_index.json')
    with open(index_file, 'w') as f:
        json.dump(index, f)
