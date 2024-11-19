# Zadanie Rekrutacyjne - Junior AI Developer

## Opis projektu

Jest to aplikacja napisana w JavaScript, której celem jest:

1. Odczytanie pliku tekstowego `article.txt` zawierającego artykuł.
2. Wysłanie treści artykułu do API OpenAI w celu wygenerowania kodu HTML z odpowiednią strukturą.
3. Zapisanie wygenerowanego kodu HTML w pliku `article.html`.
4. Utworzenie szablonu HTML w pliku `template.html`, który jest gotowy do wyświetlenia dowolnego artykułu.
5. Wstawienie wygenerowanego artykułu do szablonu i zapisanie pełnego podglądu w pliku `podglad.html`.

Dodatkowe Info Dla sprawdzającego 🙂.:

Kod jest napisany w języku angielskim, ponieważ moim zdaniem AI prezentuje lepsze "wyniki" jeśli komunikujemy się z nim w języku domyślnym / natywnym czyli Angielskim właśnie.
(+ dodatkowo z takim też językiem na pracuję codzień.)
Jeśli jednak "potrzeba" mogę w każdej chwili "przerobić" kod na język polski 🙂.

Postanowiłem użyć języka JS, bo jest mi on "bliższy" 😎.
Jeśli trzeba mogę "przerobić" JS na Python.

Nie byłem pewny jak niektóre elementy miałyby "wyglądać" oraz czy dobrze zrozumiałem zadanie.
Z chęcią przedyskutował bym tą kwestię i zmienił/poprawił niektóre elementy jeśli trzeba.

Dla przykładu:
Nie byłem pewny czy celem zadania jest użycie AI i przykładowe przedstawienie, jak wygenerowaną treść można przedstawić na stronie w formie "komponentu" / pojedynczego elementu?
Jeśli tak, to w takim wypadku opadają standardowe elementy / tagi takie jak podział na sekcje typu "header", "navbar", "hero", "poszczególne sekcje section", czy w końcu "footer".

Lub

Czy zadaniem kodu jest wygenerowanie struktury HTML oraz wygenerowanie SAMEGO zdjęcia 🖼️ odpowiadającego treści wskazanego artykułu?
Jeśli tak, to w tym wypadku wymagane było by użycie innego modelu, albo "dołożenie" dodatkowego, odpowiedzialnego za generowanie obrazów. (Oraz modyfikacja kodu oczywiście).

Jeśli chodzi o CSS preferuję użycie TailwindCSS i praktycznie całkowicie odszedłem od Bootstrapa czy czystego CSS,
ale postanowiłem niepotrzebie nie komplikować zadania. + Dodatkowo przez to prawdpodobnie złamał bym zasadę: "Możesz odwoływać się do plików bibliotek dostępnych online, ale nie dodawaj ich do repozytorium.

---

## Wymagania

1. **Node.js** (do uruchamiania aplikacji).
2. Konto OpenAI i klucz API.

---

## Instalacja

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/mkalbore/Oxido-zadanie.git
   cd Oxido-zadanie
   ```

2. Zainstaluj zależności:

   ```bash
   npm install
   ```

3. Utwórz plik `.env` i dodaj swój klucz API OpenAI:

   ```
   OPENAI_API_KEY=twoj_klucz_api
   ```

4. Upewnij się, że w folderze znajduje się plik `article.txt` z treścią artykułu do przetworzenia.

---

## Użycie

Uruchom aplikację za pomocą komendy:

```bash
node index.js
```

Aplikacja automatycznie:

- Odczyta plik `article.txt`.
- Wygeneruje plik `article.html` z HTML-em artykułu.
- Utworzy szablon `template.html`.
- Utworzy pełny podgląd artykułu w pliku `podglad.html`.

---

## Struktura plików

Po wykonaniu aplikacji projekt będzie zawierał następujące pliki:

```
Oxido-zadanie/
├── article.txt         # Plik wejściowy z artykułem w formacie tekstowym
├── article.html        # Wygenerowany artykuł w formacie HTML
├── template.html       # Szablon HTML do podglądu artykułów
├── podglad.html        # Gotowy podgląd artykułu
├── index.js            # Główny plik aplikacji
├── .env                # Plik z kluczem API OpenAI (ignorowany przez Git)
├── .env.example        # Przykładowy plik .env bez danych wrażliwych
├── .gitignore          # Lista plików ignorowanych przez Git
├── package.json        # Plik konfiguracyjny Node.js
└── node_modules/       # Folder z zależnościami (ignorowany przez Git)
```

---

## Szczegóły techniczne

### Plik `index.js`

1. **Odczyt pliku artykułu**  
   Aplikacja odczytuje zawartość pliku `article.txt` i przygotowuje treść do wysłania do OpenAI.

2. **Komunikacja z OpenAI API**  
   Używany jest model **gpt-3.5-turbo** (bardziej ekonomiczny model (Nie chciałem narażać nikogo na koszty 🙂)) do wygenerowania kodu HTML na podstawie treści artykułu. Wygenerowany kod zawiera:

   - Strukturalne elementy HTML, takie jak nagłówki, akapity, listy.
   - Miejsca na obrazy oznaczone tagami `<img src="image_placeholder.jpg" alt="opis obrazu">`.
   - Podpisy pod obrazami.

3. **Tworzenie `template.html`**  
   Tworzony jest szablon z podstawowym stylem (Bootstrap), gotowy do podglądu dowolnego artykułu.

4. **Tworzenie `podglad.html`**  
   Treść artykułu z `article.html` jest wstawiana do `template.html`, tworząc gotowy do wyświetlenia podgląd.

### Plik `.gitignore`

Plik `.gitignore` zapobiega przypadkowemu przesłaniu danych wrażliwych i niepotrzebnych plików do repozytorium Git. Ignorowane są:

- Plik `.env` (zawierający klucz API).
- Folder `node_modules/`.
- Tymczasowe pliki i logi.

---

## Przykład działania

Po uruchomieniu aplikacji powstaną trzy pliki:

1. **`article.html`**  
   HTML z treścią artykułu, np.:

   ```html
   <h1>Tytuł artykułu</h1>
   <p>Pierwszy akapit tekstu.</p>
   <img src="image_placeholder.jpg" alt="Opis obrazu" />
   <figcaption>Podpis pod obrazem</figcaption>
   ```

2. **`template.html`**  
   Szablon HTML z miejscem na treść artykułu.

3. **`podglad.html`**  
   Kompletny podgląd artykułu z wstawioną treścią.

---

## Jak zabezpieczyć dane?

Aby uniknąć przesłania klucza API na GitHub:

1. Plik `.env` jest ignorowany w `.gitignore`.
2. Klucz API jest przechowywany lokalnie i odczytywany przez aplikację za pomocą pakietu `dotenv`.

W razie potrzeby możesz przekazać przykładowe dane w pliku `.env.example`.

---

## Licencja

Projekt wykonany na potrzeby zadania rekrutacyjnego. Wszelkie prawa zastrzeżone.
