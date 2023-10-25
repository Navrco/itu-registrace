
### Jak nastavit přístup k repozitáři
`cd ~/.ssh`

`ssh-keygen -o -t rsa -C "email@example.com"`

`cat id_rsa.pub`


Profilový obrázek -> Settings -> SSH and GPG keys -> New SSH key

### První spuštění
`cd frontend; npm i; cd ..; cd backend; npm i`

spuštění backend api: `node main.js`
spuštění frontend: `npm run dev`

http://eva.fit.vutbr.cz:21213/
http://eva.fit.vutbr.cz:21212/