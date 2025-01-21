const cardFront = document.querySelector('.card-front p');
const cardBack = document.querySelector('.card-back p');
const nextButton = document.querySelector('.next-button');
const numberButton = document.querySelector('.number-button');
const cardInner = document.querySelector('.card-inner');

let count = 0;
let flashcards = [
    { question: "Care este obiectul de studiu al antropologiei?", answer: "Omul/umanitatea" },
    { question: "Care este scopul antropologiei ca ştiinţă?", answer: "Scopul e de a studia felul în care oamenii își organizează viața în diferite zone ale globului" },
    { question: "Care sunt ramurile şi subramurile antropologiei generale?", answer: "Arheologia - combină izvoarele de arhivă cu cele materiale, industrială, protecționistă\nAntropologia fizică - primatologia, antropologia umană, legală, genetica populațiilor\nAntropologia lingvistică - lingvistica istorică, descriptivă, sociolingvistică\nAntropologia culturală - etnografia, antropologia medicală, urbană, dezvoltării\nAntropologia aplicată" },
    { question: "Care sunt principalele tradiţiile naţionale de cercetare a culturilor şi care este specificul fiecăreia?", answer: "Tradiția germană - analiză documentară, studiul de teren și colectarea de artefacte culturale\nTradiția britanică - observație participativă, interviu, cercetare de teren\nTradiția franceză - metoda analitică (comparativă între mituri), analiză lingvistică\nTradiția americană - cercetare de teren, studiu de caz, analize de discursuri și investigații pe termen lung\nTradiția rusă - etnografie de teren, studiu de caz, comparație" },
    { question: "Prin ce se delimitează antropologia socio-culturală de sociologie?", answer: "Antropologia se concentrează pe studierea diversității culturale ale oamenilor, sociologia se concentrează pe studiul societății în ansamblu." },
    { question: "Care sunt sensurile comune ale “culturii”?", answer: "Cultura ca identitate colectivă, ca civilizație, ca realizare spirituală sau artistică exemplară, cultură de mase" },
    { question: "Precizaţi semnificaţiile conceptului de “cultură” în antropologie.", answer: "- Este un întreg complex care include cunoștințe, credințe, artă, drept, moravuri, obiceiuri și orice alte capacități și comportamente pe care omul și le însușește ca membru al societății\n- Cultură ca formă de adaptare la mediu\n- Cultură ca „unealtă”\n- O formă a vieții sociale, care include atât procesul individual prin care un individ dobândește cunoștințe, cât și tradiția culturală, ca moștenire între generații" },
    { question: "Explicaţi care este rolul muncii de teren în antropologie.", answer: "Permite cercetătorilor să obțină date directe, autentice despre culturi și comportamente umane." },
    { question: "Cărui grup de mamifere îi aparţine omul şi care sunt trăsăturile acestuia?", answer: "Homo sapiens, bipedism, creier mare, capacitatea de a utiliza unelte, limbaj, comportament social complex, adaptabilitate" },
    { question: "Precizaţi care sunt termenii centrali ai teoriei evoluţioniste.", answer: "Adaptarea, selecția naturală" },
    { question: "Precizaţi care au fost modificările anatomice ale primatelor în condiţiile locuirii în pădurile tropicale.", answer: "Transformări ale organelor de simț, ale creierului, modificarea formei scheletului" },
    { question: "Precizaţi care au fost formele de adaptare prin comportament ale primatelor în condiţiile locuirii în pădurile tropicale.", answer: "Apariția comportamentului social învățat, organizarea ierarhică a grupurilor, schimbul de membri între grupuri" },
    { question: "Care au fost factorii ce au condus la apariţia strămoşilor oamenilor?", answer: "Schimbare climatică, coborârea în savană, consumul de carne" },
    { question: "Care sunt strămoşii genului Homo?", answer: "Sivapitecine, australopiteci, Australopithecus afarensis/africanus/boisei/robustus" },
    { question: "Când a apărut şi care au fost trăsăturile lui Homo Habilis?", answer: "Acum 2 milioane de ani, creștere în volum a creierului, dimorfism sexual, modificarea dentiției" },
    { question: "Când a apărut şi care au fost trăsăturile lui Homo Erectus?", answer: "Acum 1,6 milioane de ani, diminuare dimorfism sexual, modificarea arhitecturii feței, creștere în volum a creierului" },
    { question: "Când a apărut şi care au fost trăsăturile lui Homo Sapiens arhaic?", answer: "Acum 200-300.000 de ani, variație fizică" },
    { question: "Precizaţi care este poziţia lui Noam Chomsky în privinţa modului în care limbajul funcţionează în relaţie cu procesele mentale.", answer: "Noam Chomsky susține că limbajul este o abilitate înnăscută și că oamenii sunt născuți cu un „dispozitiv de achiziție a limbajului” care le permite să învețe rapid limba. El crede că limbajul se bazează pe o „gramatică universală” comună tuturor limbilor și că învățarea limbajului este ghidată de structuri mentale interne. În opinia sa, limbajul este strâns legat de procesele cognitive și nu poate fi explicat doar prin comportament extern sau imitație, așa cum sugerau teoriile behavioriste." },
    { question: "Ce presupune ipoteza Sapir-Whorf?", answer: "Limbile au o influență asupra felului în care oamenii gândesc, producând diferențe în percepțiile realității" },
    { question: "Care sunt componentele sistemului gestual-apelativ?", answer: "Componenta sonoră și kinestică" },
    { question: "Elaboraţi asupra tabuului incestului.", answer: "- Explicație psihologică: copiii adulți au o repulsie față de sexualitatea lor\n- Explicație genetică: un mecanism natural de protecție evolutivă" },
    { question: "Numiţi şi caracterizaţi succint tipurile de familie.", answer: "Conjugală/consanguină, nucleară/extinsă, monogamă/poligamă - poliginie (bărbatul are mai multe soții), poliandrie" },
    { question: "Care sunt formele de schimb marital?", answer: "Prețul miresei, servicii în schimbul miresei, zestrea" },
    { question: "Precizaţi şi caracterizaţi tipurile de organizare a descendenţei.", answer: "- Patrilineară: pe linia tatălui\n- Matrilineară: pe linia mamei\n- Bilineară: pe ambele, și mama și tata\n- Ambilineară: indivizii își aleg pe care parte o vor\n- Unilineară: nu se permite recunoașterea ambelor laturi, trebuie să fie aleasă doar una" },
    { question: "Care sunt funcţiile grupurilor de descendenţă?", answer: "Moștenirea bunurilor, transmiterea identității culturale și tradițiilor, reglarea relațiilor sociale și a statutului, sprijin social și economic, controlul relațiilor de familie și al căsătoriei, asigurarea continuității grupului, reglarea moștenirii și autorității grupului" },
    { question: "Numiţi principalele sisteme terminologice de organizare a rudeniei.", answer: "Sistemul eschimoșilor, hawaian, irochez, crow, omaha" },
    { question: "Numiţi şi caracterizaţi tipurile de societăţi în funcţie de practicile de subzistenţă.", answer: "- Societăți de căutători de hrană (prin păduri, prin Africa, puțini)\n- Horticole (păduri subtropicale, fără animale)\n- Pastorale\n- Agricole\n- Industriale" },
    { question: "Care sunt criteriile de diviziune a muncii în societăţile preindustriale?", answer: "După criteriul sexului, după criteriul vârstei, după specializarea muncii" },
    { question: "Caracterizaţi sistemul proprietăţii în societăţile preindustriale.", answer: "Proprietate asupra terenurilor, proprietate comună a resurselor naturale în cadrul lineajului/bandei/tribului, proprietate asupra tehnologiilor" },
    { question: "Caracterizaţi schimbul de reciprocitate.", answer: "- Generalizată: formă de schimb în care valoarea bunurilor schimbate nu e calculată și în care momentul primirii contra-darului nu e specificat\n- Echilibrată: în care bunurile oferite și primite trebuie să fie de valoare egală și în care momentul schimbului e specificat\n- Negativă: în care cel ce inițiază schimbul vrea să obțină un bun de valoare superioară" },
    { question: "Caracterizaţi schimbul bazat pe redistribuţie.", answer: "Bunurile sunt colectate de un centru, unde sunt asortate, numerate, realocate: guvernamental, risipă ostentativă, potlatch" },
    { question: "Caracterizaţi schimbul bazat pe piaţă.", answer: "Vânzarea și cumpărarea de bunuri și servicii care au prețuri stabilite pe baza cererii și ofertei" },
    { question: "Numiţi şi caracterizaţi formele controlului social.", answer: "Intern - convingerile\nExtern - sancțiunile" },
    { question: "Numiţi şi caracterizaţi succint tipurile de sisteme politice din societăţile preindustriale.", answer: "Banda: grup de familii extinse care locuiesc împreună, care se reunesc pe baze ad-hoc și care nu-și datorează suveranitatea unei unități sociale superioare\nTribul: grup ce reunește comunități independente care ocupă un teritoriu determinat, vorbesc aceeași limbă, împărtășesc aceeași cultură, și care sunt integrate printr-un element unificator\nȘefăria: formă regională de putere politică în care două sau mai multe grupuri locale sunt organizate sub conducerea unui singur șef care se află în vârful unei ierarhii cu ranguri diferite\nStatul: formă centralizată de organizare politică în care puterea e deținută de un guvern care poate utiliza în mod legitim forța pentru a regla relațiile dintre cetățenii săi, precum și relațiile cu alte state" },
    { question: "Care sunt funcţiile religiei?", answer: "Psihologică, socială, de cunoaștere" },
    { question: "Care sunt existenţele supranaturale ce fac obiectul credinţei?", answer: "Zei/zeite, sufletele strămoșilor, puteri/ființe supranaturale" },
    { question: "Caracterizaţi credinţa în sufletele strămoşilor.", answer: "Asociată credinței că oamenii sunt formați din două părți: corp material și spirit vital. Spiritele vitale își păstrează interesul pentru lumea celor vii după moartea corpului material." },
    { question: "Caracterizaţi animismul.", answer: "Credința în ființe spirituale: spiritele interferează cu lumea celor vii și pot fi manipulate de șamani" },
    { question: "Caracterizaţi animatismul.", answer: "Credința în puteri care nu sunt în posesia unor agenți, și sunt forțe supranaturale inerente lucrurilor" },
    { question: "Explicaţi diferenţa dintre preoţi şi şamani.", answer: "Preoții sunt prezenți în societățile stratificate, își dobândesc statutul prin educație și inițiere ceremonială, își primesc legitimitatea de la organizația/cultul religios.\nSamanii sunt prezenti in societatile egalitare, isi dobandesc statutul singuri prin autoizolare, mutilare rituala, isi primesc legitimitatea in mod performativ." },
    { question: "Cultură (semnificaţia antropologică contemporană)", answer: "Un set de reguli, standarde, idei, convingeri, valori care, atunci când sunt însușite de membrii unei societăți, produc comportamente care se încadrează într-o variație considerată de membrii societății ca fiind potrivită și acceptabilă." },
    { question: "Enculturaţie", answer: "Procesul prin care indivizii învață și adoptă valorile, normele, comportamentele și credințele specifice unei culturi sau societăți." },
    { question: "Aculturaţie", answer: "Procesul prin care un grup sau o comunitate adoptă elemente ale unei culturi diferite, de obicei ca urmare a contactului direct între culturi." },
    { question: "Etnocentrism", answer: "Tendința de a judeca alte culturi prin prisma propriei culturi, considerând propria cultură ca fiind superioară celorlate." },
    { question: "Relativism cultural", answer: "Abordarea conform căreia fiecare cultură trebuie înțeleasă în propriul său context, fără a o judeca conform normelor și valorilor altor culturi." },
    { question: "Xenofobie", answer: "Teama sau ura față de persoanele sau grupurile care provin din culturi, naționalități sau țări diferite." },
    { question: "Rasism", answer: "Credința în superioritatea unei rase față de altele și tratamentul inegal al oamenilor în funcție de rasa lor." },
    { question: "Adaptare", answer: "Procesul prin care o populație sau un individ se modifică sau se ajustează la condițiile de mediu, economice, sociale sau culturale pentru a supraviețui și a prospera." },
    { question: "Selecţie naturală", answer: "Este mecanismul fundamental al evoluției speciilor de plante și animale, constând în eliminarea (prin lupta pentru existență) a indivizilor cu însușiri necorespunzătoare și păstrarea indivizilor cu însușiri avantajoase din punct de vedere biologic." },
    { question: "Dimorfism sexual", answer: "Diferențele fizice și comportamentale între masculi și femele ale aceleași specii, care nu sunt legate direct de organele reproductive. (culoare, comportament - exemplu: la păsări)" },
    { question: "Limbaj", answer: "Sistem de comunicare care utilizează sunete și gesturi care sunt combinate după un set de reguli cu scopul de a produce sensuri." },
    { question: "Semn lingvistic", answer: "Unitatea de bază a limbajului, care combină un concept (semnificația) cu un semnificator (sunetul sau forma grafică)." },
    { question: "Simbol", answer: "Sunet/gest/semn grafic care are o semnificație produsă în cadrul unui grup uman." },
    { question: "Paralimbaj", answer: "Aspectele non-verbale ale comunicării care însoțesc vorbirea, cum ar fi intonația, ritmul, volumul vocii, mimica sau gesturile." },
    { question: "Vocabular focal", answer: "Un set de cuvinte sau termeni care sunt folosiți pentru a desemna obiecte sau fenomene considerate importante sau relevante într-o anumită cultură." },
    { question: "Diglosie", answer: "O schimbare în stilul vorbirii, de la o variantă literară la una populară." },
    { question: "Căsătoria în societăţile tradiţionale", answer: "O tranzacție și contractual ce rezultă din ea prin care societatea recunoaște dreptul unei femei și al unui bărbat de a solicita și de a oferi accesul la sexualitatea celuilalt și prin care femeia e îndreptățită să facă copii." },
    { question: "Exogamie", answer: "Formă de căsătorie în care partenerul e ales din afara grupului familial." },
    { question: "Endogamie", answer: "Formă de căsătorie care presupune, obligă sau recomandă alegerea partenerului din cadrul unui anume grup." },
    { question: "Consanguinitate", answer: "Se referă la relațiile de rudenie biologică între persoane care împărtășesc un ascendent comun." },
    { question: "Rudenie prin alianţă", answer: "Legăturile de rudenie care se formează între două familii sau grupuri prin căsătorie." },
    { question: "Familie", answer: "O unitate socială fundamentală care include un grup de indivizi legați prin rudenie, căsătorie sau alte forme de relații legale sau sociale." },
    { question: "Căsătorie/familia monogamă", answer: "Căsătorie sau familie în care un individ are un singur partener pe o perioadă definită." },
    { question: "Căsătorie/familie poligamă", answer: "Căsătorie sau familie în care un individ are mai mulți parteneri simultan, de obicei un bărbat cu mai multe soții (poliginie) sau o femeie cu mai mulți soți (poliandrie)." },
    { question: "Monogamie serială", answer: "Mai multe căsătorii/parteneriate monogame de-a lungul vieții, dar doar cu un singur partener la un moment dat." },
    { question: "Leviratul", answer: "Când o văduvă se căsătorește cu fratele soțului decedat." },
    { question: "Suroratul", answer: "Când un văduv se căsătorește cu sora soției decedate." },
    { question: "Căsătorie cu rezidenţă patrilocală", answer: "Locuința la tatăl soțului." },
    { question: "Căsătorie cu rezidenţă matrilocală", answer: "Locuința la mama soției." },
    { question: "Căsătorie cu rezidenţă ambilocală", answer: "Alegerea de a locui cu familia soțului/soției sau între cele două." },
    { question: "Căsătorie cu rezidenţă avunculară", answer: "Locuința la familia unchiului/mătușii unuia dintre soți." },
    { question: "Căsătorie cu rezidenţă neolocală", answer: "Într-un loc separat de familiile lor, într-o locuință proprie, adesea într-o altă localitate sau zonă." },
    { question: "Grup de descendenţă", answer: "Oricare dintre entitățile sociale în care criteriul de apartenență al indivizilor este cel de a fi descendenții direcți ai unui strămoș, real sau mitic." },
    { question: "Descendenţă patrilineală", answer: "Se face pe linia paternă." },
    { question: "Descendenţă matrilineală", answer: "Se face pe linia maternă, dar împreună cu frații femeii." },
    { question: "Descendenţă dublu unilineală", answer: "Este recunoscută atât pe linia maternă cât și pe linia paternă în același timp, dar în raport cu acțiuni/scopuri diferite." },
    { question: "Descendenţă ambilineală", answer: "Individul este liber să aleagă ce descendență să urmeze." },
    { question: "Lineaj", answer: "Grup corporatist de descendență compus din rude consanguine care își trasează genealogia în descendență prin legături cunoscute de la un strămoș comun." },
    { question: "Clan", answer: "Grup de lineaje cu un strămoș comun (mitic)." },
    { question: "Fratrie", answer: "Grup de descendență compus din două sau mai multe clanuri care afirmă că au un strămoș comun." },
    { question: "Moietie", answer: "Asocierea a două grupuri de frații." },
    { question: "Totemism", answer: "Credința că un grup de oameni este legat de un animal, plantă sau forță naturală dată descendenței comune dintr-un spirit ancestral comun." },
    { question: "Sistem economic", answer: "Sistemul prin care într-o societate bunurile sunt produse, distribuite și consumate." },
    { question: "Mecanism de nivelare", answer: "Obligația socială prin care o familie este constrânsă să distribuie o parte din bunurile pe care le deține, astfel încât nicio familie să nu acumuleze mai mult decât alta." },
    { question: "Schimb bazat pe reciprocitate generalizată", answer: "Formă de schimb în care valoarea bunurilor schimbate nu este calculată și în care momentul primirii contra-darului nu este specificat." },
    { question: "Schimb bazat pe reciprocitate echilibrată", answer: "În care bunurile oferite și primite trebuie să fie de valoare egală și în care momentul schimbului este specificat." },
    { question: "Schimb bazat pe reciprocitate negativă", answer: "În care cel care inițiază schimbul vrea să obțină un bun de valoare superioară." },
    { question: "Comerţ tăcut", answer: "Un tip de comerț în care nu există o comunicare verbală directă între cele două părți." },
    { question: "Bandă", answer: "Grup de familii extinse care locuiesc împreună, care se reunesc pe baze ad-hoc și care nu își datorează suveranitatea unei unități sociale superioare." },
    { question: "Trib", answer: "Grup ce reunește comunități independente care ocupă un teritoriu determinat, vorbesc aceeași limbă, împărtășesc aceeași cultură și sunt integrate printr-un element unificator." },
    { question: "Şeferie", answer: "Formă regională de putere politică în care două sau mai multe grupuri locale sunt organizate sub conducerea unui singur șef, care se află în vârful unei ierarhii cu ranguri diferite." },
    { question: "Stat", answer: "Formă centralizată de organizare politică în care puterea este deținută de un guvern care poate utiliza în mod legitim forța pentru a reglementa relațiile dintre cetățenii săi și relațiile cu alte state." },
    { question: "Naţiune", answer: "Un grup de oameni care se identifică prin apartenența la o unitate socială distinctă de altele, pe baza unor elemente comune: limbă, istorie, instituții, religie." },
    { question: "Religie", answer: "Un set de credințe și ritualuri, raționalizate în mituri, prin care sunt mobilizate puteri supranaturale cu scopul de a împlini sau de a preveni transformări ale situației oamenilor sau naturii." },
    { question: "Credinţă (religioasă)", answer: "Convingere în existența unei forțe, puteri sau ființe supranaturale." },
    { question: "Ritual", answer: "Modalitatea prin care indivizii se relaționează activ la sfera sacrului." },
    { question: "Mit", answer: "Narațiune care relatează evenimente și fapte exemplare din lumea comună a zeilor și oamenilor." },
    { question: "Panteon", answer: "Totalitatea zeilor unei religii." },
    { question: "Rit de trecere", answer: "Marchează trecerea unei persoane dintr-o stare existențială în alta." },
    { question: "Rit de intensificare", answer: "Realizat pentru a intensifica aspecte ale vieții sociale, economice sau religioase într-o comunitate." },
    { question: "Magie prin simpatie", answer: "Asemănătorul produce asemănător." },
    { question: "Magie prin contagiune", answer: "Partea rămâne în contact cu întregul după separare." }
];
let total = flashcards.length;

let next_messages = [
    {message : "Next pls..."},
    {message : "Thank you, next"},
    {message : "Urmatoarea intrebare"},
    {message : "Next"},
    {message : "She's on FIRE"},
    {message : "Next"},
    {message : "Next"}
];

function getRandomFlashcard() {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    return flashcards[randomIndex];
}

function updateCard() {
    cardInner.classList.remove('flipped');
    cardBack.style.visibility = 'hidden';
    if (flashcards.length === 0) {
        cardFront.textContent = "Gata intrebarile iub!!!";
        cardBack.textContent = "Da refresh la pagina pentru a incepe din nou. ";
        setTimeout(() => {
        cardBack.style.visibility = 'visible';
        }, 300);
        return;
    }
    count ++;
    const flashcard = getRandomFlashcard();
    if (count < total)
        numberButton.textContent = count + '/' + total;
    else numberButton.textContent = 'Ultima intrebare iub!';
    cardFront.textContent = flashcard.question;
        cardBack.textContent = flashcard.answer;
    flashcards = flashcards.filter(card => card !== flashcard);
    nextButton.textContent = next_messages[Math.floor(Math.random() * next_messages.length)].message;
    setTimeout(() => {
        cardBack.style.visibility = 'visible';
    }, 300);
}

cardInner.addEventListener('click', () => {
    cardInner.classList.toggle('flipped');
});

updateCard();

nextButton.addEventListener('click', updateCard);
