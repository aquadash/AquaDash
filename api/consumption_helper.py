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
    
    if monthly:
        query = "consumption | extend Month=format_datetime(['time'],\"MM\") | summarize TotalConsumed = sum(Value) by ManagedObjectid, Month| where ManagedObjectid =="+str(objId)
    else:
        query = "consumption | summarize TotalConsumed = sum(Value) by ManagedObjectid, bin(['time'], 7d) | where ManagedObjectid =="+str(objId)
    
    response = client.execute(db, query)
    json_result = json.loads(str(response.primary_results[0]))
    return json_result['data']