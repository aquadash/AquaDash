# API Documentation

## Getting annual rainfall

API takes latitude and longitude, returns average monthly rainfall for that location

`POST` `https://<path>/api/GetRainfallByAddress`

```json
{"latitude": "-33.84","longitude": "151.21"}
```

```json
{
  "1": 1807.09,
  "2": 1805.79,
  "3": 1788.19,
  "4": 1739.99,
  "5": 1721.19,
  "6": 1715.29,
  "7": 1703.99,
  "8": 1693.39,
  "9": 1693.19,
  "10": 1722.89,
  "11": 1744.49,
  "12": 1780.79
}
```
