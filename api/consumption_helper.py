from azure.kusto.data import KustoClient, KustoConnectionStringBuilder
import json
import os

def get_water_usage(objId, monthly = True):
    cluster = os.getenv("CLUSTER")
    client_id = os.getenv("CLIENT_ID")
    client_secret = os.getenv("CLIENT_SECRET")
    authority_id = os.getenv("AUTHORITY_ID")
    kcsb = KustoConnectionStringBuilder.with_aad_application_key_authentication(cluster, client_id, client_secret, authority_id)
    client = KustoClient(kcsb)
    db = "unity-consumption"
    
    table = os.getenv("ADXTable")
    if monthly:
        query = f"{table} | extend Month=format_datetime(['time'],\"MM\") | summarize TotalConsumed = sum(Value) by ManagedObjectid, typeM, Month| where ManagedObjectid =="+str(objId)+" and (typeM ==\"Pulse1\" or typeM==\"/10266/0\")"
    else:
        query = f"{table} | summarize TotalConsumed = sum(Value) by ManagedObjectid, typeM, bin(['time'], 7d) | where ManagedObjectid =="+str(objId)+" and (typeM ==\"Pulse1\" or typeM==\"/10266/0\")"
    response = client.execute(db, query)
    json_result = json.loads(str(response.primary_results[0]))
    return json_result['data']