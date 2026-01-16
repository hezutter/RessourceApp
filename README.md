# Ressourcenplanung WebApp

Dieses Repo enthält einen minimalen Prototyp für eine Ressourcenplanungs-WebApp (IT-Dienstleister, ca. 50 Consultants). Der Fokus liegt auf einer klaren Datenbasis (SQL-Schema) sowie einer ersten UI für Wochen-, Monats- und Jahresansichten.

## Ziele

- Wochenplanung pro Consultant (z. B. 40h / 20h / 40h pro Woche).
- Monatsansicht mit Drag & Drop von Wochenblöcken.
- Jahresansicht mit Aggregation und Farblogik für Auslastungen.
- Pflege von Abwesenheiten (Krankheit/Urlaub) und Stammdaten.

## Struktur

- `schema.sql`: Datenbankschema (PostgreSQL/SQLite-kompatibel).
- `app/`: Statische WebApp (HTML/CSS/JS) als klickbarer Prototyp.
- `docs/`: Notizen zur Domäne und Felddefinitionen.

## Lokales Starten

```bash
python -m http.server 8000 --directory app
```

Anschließend `http://localhost:8000` im Browser öffnen.
