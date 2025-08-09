import pandas as pd
import json

def clean_data(df):
    """Limpia el DataFrame eliminando filas vacías y columnas innecesarias."""
    df = df.dropna(how='all')
    return df

def extract_election_info(df):
    """Extrae el tipo de elección y la fecha."""
    election_data = df.iloc[0, 0].strip()
    tipo, fecha = [item.strip() for item in election_data.split("|")]
    return tipo, fecha

def process_circunscriptions(df):
    """Procesa las circunscripciones y las convierte a formato JSON."""
    df_circuns = df.drop([58])
    df_circuns = df_circuns.drop(columns=df_circuns.columns[15:])
    df_circuns.columns = df_circuns.iloc[3]
    df_circuns = df_circuns.iloc[4:].reset_index(drop=True)
    
    circunscriptions = []
    for _, row in df_circuns.iterrows():
        circunscription = {
            "name": row['Nombre de Provincia'],
            "circunscriptionID": row['Código de Provincia'],
            "electionID": 1,  # Se puede modificar según sea necesario
            "voters": row['Total votantes'],
            "valid_votes": row['Votos válidos'],
            "blank_votes": row['Votos en blanco'],
            "invalid_votes": row['Votos nulos'],
            "votes_cand": row['Votos a candidaturas']
        }
        circunscriptions.append(circunscription)

    return circunscriptions

def process_parties(df):
    """Procesa los partidos y crea un mapeo de siglas a nombre del partido."""
    df_partidos = df.drop(columns=df.columns[3:15])
    columns_from_16 = df.columns[15:]
    even_columns_from_16 = [col for i, col in enumerate(columns_from_16, start=15) if i % 2 == 0]
    df_partidos = df_partidos.drop(columns=even_columns_from_16)
    
    names = df_partidos.iloc[1, 3:]
    acronyms = df_partidos.iloc[2, 3:]
    party_map = dict(zip(acronyms, names))

    return df_partidos, party_map

def process_results(df_partidos, party_map):
    """Procesa los resultados de los partidos y los convierte a formato JSON."""
    df_partidos.iloc[3, 3:] = df_partidos.iloc[2, 3:].values
    df_partidos.columns = df_partidos.iloc[3]
    df_partidos = df_partidos.drop([1, 2, 3, 4, 58])
    results = []
    for _, row in df_partidos.iterrows():
        circunscription_id = row['Código de Provincia']
        for party, votes in row[3:].items():
            if votes > 0:
                result = {
                    'name': party_map.get(party, party),
                    'acronym': party,
                    'votes': votes,
                    'circunscriptionID': circunscription_id
                }
                results.append(result)
    return results

def save_to_json(filename, data):
    """Guarda los datos en un archivo JSON."""
    with open(filename, 'w') as f:
        json.dump(data, f, indent=2)

def main():
    # Cargar el archivo Excel
    df = pd.read_excel('PROV_02_202307_1.xlsx')
    
    # Limpiar los datos
    df = clean_data(df)

    # Extraer la información de elección
    #tipo, fecha = extract_election_info(df)

    # Procesar las circunscripciones
    circunscriptions = process_circunscriptions(df)
    save_to_json('circunscriptions.json', circunscriptions)

    # Procesar los partidos
    df_partidos, party_map = process_parties(df)
    
    # Procesar los resultados
    results = process_results(df_partidos, party_map)
    save_to_json('results.json', results)

if __name__ == "__main__":
    main()
