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
    except:
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
    counter = 0
    errors = 0
    batchSize = 50
    blocked = False
    batch = []
    for key in data:
        translated = data[key]
        if translated != "":
            result[key] = translated
            continue

        batch.append(key)
        if len(batch) >= batchSize:
            if blocked:
                copyBatch(batch, result)
            else:
                if not translateBatch(batch, srcLang, destLang, result):
                    copyBatch(batch, result)
                    blocked = True
            batch = []

        counter = counter + 1
        if (counter % 10) == 0:
            print (" - " + str(counter))

    if blocked:
        copyBatch(batch, result)
    else:
        translateBatch(batch, srcLang, destLang, result)

    print("Complete with " + str(errors) + " Errors")
    return result

filePath = sys.argv[1]
with open(filePath, encoding="utf8") as json_file:
    data = json.load(json_file)
    localizedData = localizeFile(data, sys.argv[2], sys.argv[3])

with open(filePath, 'w', encoding='utf8') as out_file:
    json.dump(localizedData, out_file, ensure_ascii=False, indent=4, sort_keys=True)

reverseData = {}
for key in localizedData:
    value = localizedData[key]
    if value == "":
        continue

    reverseData[value] = key

with open(filePath + '_R_.json', 'w', encoding='utf8') as out_file:
    json.dump(reverseData, out_file, ensure_ascii=False, indent=4, sort_keys=True)