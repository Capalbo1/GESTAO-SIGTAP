import requests

def buscar_procedimentos(cid=None):
    # Mock (substitua pela API real do SIGTAP)
    dados_mock = [
        {"codigo": "07.02.01.011-4", "nome": "Cirurgia de Catarata", "valor": 1200, "cid": "H25"},
        {"codigo": "06.01.01.003-5", "nome": "Consulta Cardiologia", "valor": 550, "cid": "E11"}
    ]
    
    if cid:
        return [p for p in dados_mock if p['cid'] == cid]
    return dados_mock