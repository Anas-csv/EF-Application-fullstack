import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

def file_conso(filepath):
    f = open(filepath, 'r', encoding='utf-8')
    content = json.load(f)
    return content

data = file_conso("site_1.json")
conso = data["historique"]

L = []
T = []
X = []

def holt(a,b,p):
    L = [conso[0]["consommation"]]
    T = [conso[1]["consommation"] - conso[0]["consommation"]]

    for i in range(1,len(conso)):
        L.append(a * conso[i]["consommation"] + (1 - a) * (L[i-1] + T[i-1]))
        T.append(b * (L[i] - L[i-1]) + (1 - b) * T[i-1])

    for j in range(1,p+1):
        X.append(L[-1] + j * T[-1])

    return X

@app.get("/historique")
def historique():
    return data["historique"]

@app.get("/prevision")
def prevision():
    previ = []
    A = holt(0.3,0.2,3)
    annee, mois = conso[-1]["mois"].split("-")
    annee, mois = int(annee), int(mois)

    for i in range (0,3):
        mois+=1
        if mois > 12:
            mois = 1
            annee += 1
        previ.append({"mois": f"{annee}-{mois:02d}", "consommation": A[i]})

    return previ

@app.get("/indicateurs")
def indicateurs():
    return data["indicateurs"]