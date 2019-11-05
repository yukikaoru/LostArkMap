import sys
import os
import json
import time
from googletrans import Translator

if len(sys.argv) < 4:
    print("Args: <src_file> <src_lng> <dest_lng>")
    sys.exit()

def translateBatch(batch, srcLang, destLang, target):
    if len(batch) == 0:
        return

    translator = Translator()
    try:
        translated = translator.translate(batch, src=srcLang, dest=destLang)
    except Exception as e:
        print(e)
        return False

    for i in range(len(batch)):
        target[batch[i]] = translated[i].text

    print(" Delaying next batch...")
    time.sleep(5)
    return True

def copyBatch(batch, target):
    if len(batch) == 0:
        return

    for i in range(len(batch)):
        target[batch[i]] = ""

def localizeFile(data, srcLang, destLang):
    print("Translating " + str(len(data)) + " Lines from " + srcLang + " to " + destLang)

    result = {}
    result[srcLang] = {}
    counter = 0
    errors = 0
    batchSize = 50
    blocked = False
    batch = []
    for key in data:
        translated = data[key]
        if translated != "":
            result[srcLang][key] = translated
            continue

        batch.append(key)
        if len(batch) >= batchSize:
            if blocked:
                copyBatch(batch, result[srcLang])
            else:
                if not translateBatch(batch, srcLang, destLang, result[srcLang]):
                    copyBatch(batch, result[srcLang])
                    blocked = True
            batch = []

        counter = counter + 1
        if (counter % 10) == 0:
            print (" - " + str(counter))

    if blocked:
        copyBatch(batch, result[srcLang])
    else:
        translateBatch(batch, srcLang, destLang, result[srcLang])

    print("Complete with " + str(errors) + " Errors")
    return result

filePath = sys.argv[1]
fileName = filePath.replace('.json', '')
srcLang = sys.argv[2]
destLang = sys.argv[3]

with open(filePath, encoding="utf8") as json_file:
    data = json.load(json_file)
    localizedData = localizeFile(data[srcLang], srcLang, destLang)

with open(filePath, 'w', encoding='utf8') as out_file:
    json.dump(localizedData, out_file, ensure_ascii=False, indent=4, sort_keys=True)

reverseData = {}
reverseData[srcLang] = {}
for key in localizedData[srcLang]:
    value = localizedData[srcLang][key]
    if value == "":
        continue

    reverseData[srcLang][value] = key

with open(fileName + '_R.json', 'w', encoding='utf8') as out_file:
    json.dump(reverseData, out_file, ensure_ascii=False, indent=4, sort_keys=True)