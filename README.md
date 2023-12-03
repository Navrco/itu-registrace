#Webová aplikace na poznámky

Vytvořeno knihovnou React bez jakéhokoli build nástroje.
Použito Python Flask API, databázové modely pomocí SQLAlchemy.

Doporučuju využít vitrualního prosředí pythonu

`pip install virtualenv`
`python -m venv`

Instalace knihoven do virtualního prostředí

`source venv/bin/activate`
`pip install -r requirements.txt`

Pro překlad react komponentu na minimalozivany javascrtipt

`npm install`

Spuštění:

`source venv/bin/activate`
`python3 run.py`


### Jak nastavit přístup k repozitáři na vašem linuxovem stroji
`cd ~/.ssh`

`ssh-keygen -o -t rsa -C "email@example.com"`

`cat id_rsa.pub`

Profilový obrázek -> Settings -> SSH and GPG keys -> New SSH key
