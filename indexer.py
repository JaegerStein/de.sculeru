import os
import json

base_path = './app/'
kbs = {'kb/Legende/': 'lore', 'kb/Journal/': 'journal', 'kb/Regeln/': 'rules', 'tools/': 'tools'}

index = []
for kb_path, category in kbs.items():
    full_path = os.path.join(base_path, kb_path)
    for root, dirs, files in os.walk(full_path):
        # excludes designated directories from the search
        dirs[:] = [d for d in dirs if not d.endswith('.obsidian')]
        for file in files:
            if file.endswith('.md'):
                file_type = 'markdown'
            elif file.endswith('.html'):
                file_type = 'html'
            elif file.endswith('.canvas'):
                file_type = 'canvas'
            else:
                continue
            file_path = os.path.join(root, file).replace('\\', '/')

            uid = file_path.replace(base_path, '')
            title = os.path.splitext(os.path.basename(file_path))[0]
            last = int(os.path.getmtime(file_path))

            entry = {'id': uid, 'title': title, 'last': last, 'category': category, 'type': file_type}
            index.append(entry)

index_file = os.path.join(base_path, 'index.json')
with open(index_file, 'w') as f:
    json.dump(index, f)
