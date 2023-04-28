import os
import json
from datetime import datetime

base_path = './www/'
kbs = ['kb/Legende/', 'kb/Journal/', 'kb/Regeln/', 'tools/']
kb2cat = {'kb/Legende/': 'lore', 'kb/Journal/': 'journal', 'kb/Regeln/': 'rules', 'tools/': 'tools'}

index = []
for kb in kbs:
    kb_path = os.path.join(base_path, kb)
    for root, dirs, files in os.walk(kb_path):
        dirs[:] = [d for d in dirs if not d.endswith('.obsidian')]
        for file in files:
            if file.endswith('.md') or file.endswith('.html') or file.endswith('.canvas'):
                file_path = os.path.join(root, file).replace('\\', '/')

                uid = file_path.replace(base_path, '')
                title = os.path.splitext(os.path.basename(file_path))[0]
                last = int(os.path.getmtime(file_path))

                entry = {'id': uid, 'title': title, 'last': last, 'category': kb2cat[kb]}
                index.append(entry)

index_file = os.path.join(base_path, 'index.json')
with open(index_file, 'w') as f:
    json.dump(index, f)
