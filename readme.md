#Otwieracz do redmine-a

## Krótki opis

Otwieracz do redmina ma proste zadanie - otworzyć konkretne zadanie lub znaleźć je w redminie.
Jeżeli wpiszemy tekst - uruchomi wyszukiwanie, jeżeli numerek - otworzy zadanie lub zaraportuje czas. 

## Instalacja
AAAabby zainstalować otwieracz do redmina trzeba go pobrać, rozpakować i zainstalować, czyli:  

Pobieramy i rozpakowujemy zipa, lub ściągamy projekt bezpośrednio z git-a:
```
 git clone https://github.com/zdzisiekcom/openurl.git opener
``` 
Wchodzimy w [chrome://extensions/](chrome://extensions/)  uruchamiamy tryb programisty, wybieramy "Wczytaj rozszerzenie bez pakietu", podajemy katalog "redmineOpen" i gotowe. Mamy piękną ikonkę.

Rozszerzenie odpala się za pomocą skrótu Alt+R w chromie, można też sobie w opcjach chroma (na dole listy rozszerzen) ustawić skrót globalny w całym systemie

## Konfiguracja 

W konfiguracji można ustawić pod jakim adresem jest wyszukiwarka, zadania i raportowanie czasu.