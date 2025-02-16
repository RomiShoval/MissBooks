const { useState , useEffect,useRef } = React
const { useParams, Link,useNavigate } = ReactRouterDOM
import { bookService } from "../services/bookService.js"
import {debounce} from "../services/util.service.js"
import { googleBookService } from "../services/googleBookService.js"

export function BookAdd(){
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [addedBooks, setAddedBooks] = useState([])
    const demodata = [
        {
          "kind": "books#volume",
          "id": "Alnq6qmBpFMC",
          "etag": "7nHZRpTHHAQ",
          "selfLink": "https://www.googleapis.com/books/v1/volumes/Alnq6qmBpFMC",
          "volumeInfo": {
            "title": "Theoretical Computer Science: Exploring New Frontiers of Theoretical Informatics",
            "subtitle": "International Conference IFIP TCS 2000 Sendai, Japan, August 17-19, 2000 Proceedings",
            "authors": [
              "Jan Leeuwen"
            ],
            "publisher": "Springer Science & Business Media",
            "publishedDate": "2000-07-26",
            "description": "This book constitutes the refereed proceedings of the International Conference IFIP TCS 2000 held in Sendai, Japan in August 2000. The 32 revised full papers presented together with nine invited contributions were carefully reviewed and selected from a total of 70 submissions. The papers are organized in two tracks on algorithms, complexity, and models of computation and on logics, semantics, specification, and verification. The book is devoted to exploring new frontiers of theoretical informatics and addresses all current topics in theoretical computer science.",
            "industryIdentifiers": [
              {
                "type": "ISBN_13",
                "identifier": "9783540678236"
              },
              {
                "type": "ISBN_10",
                "identifier": "3540678239"
              }
            ],
            "readingModes": {
              "text": false,
              "image": true
            },
            "pageCount": 633,
            "printType": "BOOK",
            "categories": [
              "Computers"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "0.1.0.0.preview.1",
            "panelizationSummary": {
              "containsEpubBubbles": false,
              "containsImageBubbles": false
            },
            "imageLinks": {
              "smallThumbnail": "http://books.google.com/books/content?id=Alnq6qmBpFMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
              "thumbnail": "http://books.google.com/books/content?id=Alnq6qmBpFMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=Alnq6qmBpFMC&pg=PA31&dq=code&hl=&as_pt=BOOKS&cd=1&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=Alnq6qmBpFMC&dq=code&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Theoretical_Computer_Science_Exploring_N.html?hl=&id=Alnq6qmBpFMC"
          },
          "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
          },
          "accessInfo": {
            "country": "IL",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
              "isAvailable": false
            },
            "pdf": {
              "isAvailable": true,
              "acsTokenLink": "http://books.google.com/books/download/Theoretical_Computer_Science_Exploring_N-sample-pdf.acsm?id=Alnq6qmBpFMC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "webReaderLink": "http://play.google.com/books/reader?id=Alnq6qmBpFMC&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
          },
          "searchInfo": {
            "textSnippet": "... \u003cb\u003ecode\u003c/b\u003e , provided q is large enough ! - Concatenated codes . This term refers to any \u003cb\u003ecode\u003c/b\u003e obtained by a certain pro- cess , called concatenation of codes , that derives a new \u003cb\u003ecode\u003c/b\u003e from two given codes . Specifically , given an “ outer&nbsp;..."
          }
        },
        {
          "kind": "books#volume",
          "id": "UdfWt5smWkQC",
          "etag": "ewnCbrMfD8Y",
          "selfLink": "https://www.googleapis.com/books/v1/volumes/UdfWt5smWkQC",
          "volumeInfo": {
            "title": "Navy Management Review",
            "publishedDate": "1964",
            "industryIdentifiers": [
              {
                "type": "OTHER",
                "identifier": "UIUC:30112032684760"
              }
            ],
            "readingModes": {
              "text": false,
              "image": true
            },
            "pageCount": 590,
            "printType": "BOOK",
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "0.5.8.0.full.1",
            "panelizationSummary": {
              "containsEpubBubbles": false,
              "containsImageBubbles": false
            },
            "imageLinks": {
              "smallThumbnail": "http://books.google.com/books/content?id=UdfWt5smWkQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
              "thumbnail": "http://books.google.com/books/content?id=UdfWt5smWkQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=UdfWt5smWkQC&pg=RA20-PA6&dq=code&hl=&as_pt=BOOKS&cd=2&source=gbs_api",
            "infoLink": "https://play.google.com/store/books/details?id=UdfWt5smWkQC&source=gbs_api",
            "canonicalVolumeLink": "https://play.google.com/store/books/details?id=UdfWt5smWkQC"
          },
          "saleInfo": {
            "country": "IL",
            "saleability": "FREE",
            "isEbook": true,
            "buyLink": "https://play.google.com/store/books/details?id=UdfWt5smWkQC&rdid=book-UdfWt5smWkQC&rdot=1&source=gbs_api"
          },
          "accessInfo": {
            "country": "IL",
            "viewability": "ALL_PAGES",
            "embeddable": true,
            "publicDomain": true,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
              "isAvailable": false,
              "downloadLink": "http://books.google.com/books/download/Navy_Management_Review.epub?id=UdfWt5smWkQC&hl=&output=epub&source=gbs_api"
            },
            "pdf": {
              "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=UdfWt5smWkQC&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "FULL_PUBLIC_DOMAIN",
            "quoteSharingAllowed": false
          },
          "searchInfo": {
            "textSnippet": "... \u003cb\u003eCODE\u003c/b\u003e LIMITED DUTY CLASS \u003cb\u003eCODE\u003c/b\u003e PROSPECTIVE RATE ABBR PROSPECTIVE RATE \u003cb\u003eCODE\u003c/b\u003e PROS RATE TERMINAL DATE PROFICIENCY PAY : -\u003cb\u003eCODE\u003c/b\u003e AWARD INDICATOR ERROR INDICATOR -RETENTION \u003cb\u003eCODE\u003c/b\u003e RETENTION INDICATOR • RETENTION DATE EST DATE OF LOSS TO NAVY IND&nbsp;..."
          }
        },
        {
          "kind": "books#volume",
          "id": "0qK7mMe0uPoC",
          "etag": "u7zHgD55k6M",
          "selfLink": "https://www.googleapis.com/books/v1/volumes/0qK7mMe0uPoC",
          "volumeInfo": {
            "title": "International Commerce",
            "publishedDate": "1967",
            "industryIdentifiers": [
              {
                "type": "OTHER",
                "identifier": "IND:30000089265486"
              }
            ],
            "readingModes": {
              "text": false,
              "image": true
            },
            "pageCount": 1278,
            "printType": "BOOK",
            "categories": [
              "Consular reports"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "0.6.7.0.full.1",
            "panelizationSummary": {
              "containsEpubBubbles": false,
              "containsImageBubbles": false
            },
            "imageLinks": {
              "smallThumbnail": "http://books.google.com/books/content?id=0qK7mMe0uPoC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
              "thumbnail": "http://books.google.com/books/content?id=0qK7mMe0uPoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=0qK7mMe0uPoC&pg=RA28-PT2&dq=code&hl=&as_pt=BOOKS&cd=3&source=gbs_api",
            "infoLink": "https://play.google.com/store/books/details?id=0qK7mMe0uPoC&source=gbs_api",
            "canonicalVolumeLink": "https://play.google.com/store/books/details?id=0qK7mMe0uPoC"
          },
          "saleInfo": {
            "country": "IL",
            "saleability": "FREE",
            "isEbook": true,
            "buyLink": "https://play.google.com/store/books/details?id=0qK7mMe0uPoC&rdid=book-0qK7mMe0uPoC&rdot=1&source=gbs_api"
          },
          "accessInfo": {
            "country": "IL",
            "viewability": "ALL_PAGES",
            "embeddable": true,
            "publicDomain": true,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
              "isAvailable": false,
              "downloadLink": "http://books.google.com/books/download/International_Commerce.epub?id=0qK7mMe0uPoC&hl=&output=epub&source=gbs_api"
            },
            "pdf": {
              "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=0qK7mMe0uPoC&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "FULL_PUBLIC_DOMAIN",
            "quoteSharingAllowed": false
          },
          "searchInfo": {
            "textSnippet": "... \u003cb\u003eCode\u003c/b\u003e 505 Tel . 247- 0311 . ANCHORAGE , ALASKA , 99501 , 306 Loussac - Sogn Building . Area \u003cb\u003eCode\u003c/b\u003e 907 Tel . 272-6331 . ATLANTA , GA . , 30303 , 4th Floor , Home Savings Building , 75 Forsyth St. , N.W. Area \u003cb\u003eCode\u003c/b\u003e 404 Tel . 526-6000&nbsp;..."
          }
        },
        {
          "kind": "books#volume",
          "id": "jzEnCBJF-wwC",
          "etag": "7E22M1vIoAg",
          "selfLink": "https://www.googleapis.com/books/v1/volumes/jzEnCBJF-wwC",
          "volumeInfo": {
            "title": "Library of Congress Subject Headings",
            "authors": [
              "Library of Congress"
            ],
            "publishedDate": "1992",
            "industryIdentifiers": [
              {
                "type": "OTHER",
                "identifier": "OSU:32435065917098"
              }
            ],
            "readingModes": {
              "text": false,
              "image": true
            },
            "pageCount": 1278,
            "printType": "BOOK",
            "categories": [
              "Subject headings, Library of Congress"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "0.5.5.0.full.1",
            "panelizationSummary": {
              "containsEpubBubbles": false,
              "containsImageBubbles": false
            },
            "imageLinks": {
              "smallThumbnail": "http://books.google.com/books/content?id=jzEnCBJF-wwC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
              "thumbnail": "http://books.google.com/books/content?id=jzEnCBJF-wwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=jzEnCBJF-wwC&pg=PA940&dq=code&hl=&as_pt=BOOKS&cd=4&source=gbs_api",
            "infoLink": "https://play.google.com/store/books/details?id=jzEnCBJF-wwC&source=gbs_api",
            "canonicalVolumeLink": "https://play.google.com/store/books/details?id=jzEnCBJF-wwC"
          },
          "saleInfo": {
            "country": "IL",
            "saleability": "FREE",
            "isEbook": true,
            "buyLink": "https://play.google.com/store/books/details?id=jzEnCBJF-wwC&rdid=book-jzEnCBJF-wwC&rdot=1&source=gbs_api"
          },
          "accessInfo": {
            "country": "IL",
            "viewability": "ALL_PAGES",
            "embeddable": true,
            "publicDomain": true,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
              "isAvailable": false,
              "downloadLink": "http://books.google.com/books/download/Library_of_Congress_Subject_Headings.epub?id=jzEnCBJF-wwC&hl=&output=epub&source=gbs_api"
            },
            "pdf": {
              "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=jzEnCBJF-wwC&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "FULL_PUBLIC_DOMAIN",
            "quoteSharingAllowed": false
          },
          "searchInfo": {
            "textSnippet": "... \u003cb\u003ecode\u003c/b\u003e words , e.g. Information storage and retrieval systems - \u003cb\u003eCode\u003c/b\u003e words \u003cb\u003eCode\u003c/b\u003e words ( Information storage and retrieval ) USE Information storage and retrieval USE Manuscripts Codices , Mexican ( Pre - Columbian ) USE Manuscripts&nbsp;..."
          }
        },
        {
          "kind": "books#volume",
          "id": "XD7QCwAAQBAJ",
          "etag": "5IzeG7E0pkg",
          "selfLink": "https://www.googleapis.com/books/v1/volumes/XD7QCwAAQBAJ",
          "volumeInfo": {
            "title": "ICCWS 2016 11th International Conference on Cyber Warfare and Security",
            "subtitle": "ICCWS2016",
            "authors": [
              "Dr Tanya Zlateva and Professor Virginia Greiman"
            ],
            "publisher": "Academic Conferences and publishing limited",
            "publishedDate": "2016",
            "description": "The 11thInternational Conference on Cyber Warfare and Security (ICCWS 2016) is being held at Boston University, Boston, USA on the 17-18th March 2016. The Conference Chair is Dr Tanya Zlateva and the Programme Chair is Professor Virginia Greiman, both from Boston University. ICCWS is a recognised Cyber Security event on the International research conferences calendar and provides a valuable platform for individuals to present their research findings, display their work in progress and discuss conceptual and empirical advances in the area of Cyber Warfare and Cyber Security. It provides an important opportunity for researchers and managers to come together with peers to share their experiences of using the varied and expanding range of Cyberwar and Cyber Security research available to them. The keynote speakers for the conference are Daryl Haegley from the Department of Defense (DoD), who will address the topic Control Systems Networks...What's in Your Building? and Neal Ziring from the National Security Agency who will be providing some insight to the issue of Is Security Achievable? A Practical Perspective. ICCWS received 125 abstract submissions this year. After the double blind, peer review process there are 43 Academic Research Papers 8 PhD papers Research papers, 7 Masters and 1 work-in-progress papers published in these Conference Proceedings. These papers represent work from around the world, including: Australia, Canada, China, Czech Republic, District of Columbia, Finland, France, Israel, Japan, Lebanon, Netherlands, Pakistan, Russian Federation, Saudi Arabia, South Africa, Turkey, United Arab Emirates, UK, USA.",
            "industryIdentifiers": [
              {
                "type": "ISBN_13",
                "identifier": "9781910810828"
              },
              {
                "type": "ISBN_10",
                "identifier": "1910810827"
              }
            ],
            "readingModes": {
              "text": false,
              "image": true
            },
            "pageCount": 516,
            "printType": "BOOK",
            "categories": [
              "Computers"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "0.1.1.0.preview.1",
            "panelizationSummary": {
              "containsEpubBubbles": false,
              "containsImageBubbles": false
            },
            "imageLinks": {
              "smallThumbnail": "http://books.google.com/books/content?id=XD7QCwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
              "thumbnail": "http://books.google.com/books/content?id=XD7QCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=XD7QCwAAQBAJ&pg=PA328&dq=code&hl=&as_pt=BOOKS&cd=5&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=XD7QCwAAQBAJ&dq=code&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/ICCWS_2016_11th_International_Conference.html?hl=&id=XD7QCwAAQBAJ"
          },
          "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
          },
          "accessInfo": {
            "country": "IL",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
              "isAvailable": false
            },
            "pdf": {
              "isAvailable": true,
              "acsTokenLink": "http://books.google.com/books/download/ICCWS_2016_11th_International_Conference-sample-pdf.acsm?id=XD7QCwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "webReaderLink": "http://play.google.com/books/reader?id=XD7QCwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
          },
          "searchInfo": {
            "textSnippet": "... \u003cb\u003ecode\u003c/b\u003e scanners, compilers, test generators, etc. The nature of programming language that the source \u003cb\u003ecode\u003c/b\u003e is written, affects not only the efficiency of execution but also the complexity of structures, which will hide vulnerabilities&nbsp;..."
          }
        },
        {
          "kind": "books#volume",
          "id": "Coc-AQAAMAAJ",
          "etag": "FcfmjNstoY4",
          "selfLink": "https://www.googleapis.com/books/v1/volumes/Coc-AQAAMAAJ",
          "volumeInfo": {
            "title": "The Journal of the Senate During the ... Session of the Legislature of the State of California",
            "authors": [
              "California. Legislature. Senate"
            ],
            "publishedDate": "1899",
            "industryIdentifiers": [
              {
                "type": "OTHER",
                "identifier": "UCD:31175032134853"
              }
            ],
            "readingModes": {
              "text": false,
              "image": true
            },
            "pageCount": 1606,
            "printType": "BOOK",
            "categories": [
              "California"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "2.7.7.0.full.1",
            "panelizationSummary": {
              "containsEpubBubbles": false,
              "containsImageBubbles": false
            },
            "imageLinks": {
              "smallThumbnail": "http://books.google.com/books/content?id=Coc-AQAAMAAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
              "thumbnail": "http://books.google.com/books/content?id=Coc-AQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=Coc-AQAAMAAJ&pg=PA935&dq=code&hl=&as_pt=BOOKS&cd=6&source=gbs_api",
            "infoLink": "https://play.google.com/store/books/details?id=Coc-AQAAMAAJ&source=gbs_api",
            "canonicalVolumeLink": "https://play.google.com/store/books/details?id=Coc-AQAAMAAJ"
          },
          "saleInfo": {
            "country": "IL",
            "saleability": "FREE",
            "isEbook": true,
            "buyLink": "https://play.google.com/store/books/details?id=Coc-AQAAMAAJ&rdid=book-Coc-AQAAMAAJ&rdot=1&source=gbs_api"
          },
          "accessInfo": {
            "country": "IL",
            "viewability": "ALL_PAGES",
            "embeddable": true,
            "publicDomain": true,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
              "isAvailable": false,
              "downloadLink": "http://books.google.com/books/download/The_Journal_of_the_Senate_During_the_Ses.epub?id=Coc-AQAAMAAJ&hl=&output=epub&source=gbs_api"
            },
            "pdf": {
              "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=Coc-AQAAMAAJ&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "FULL_PUBLIC_DOMAIN",
            "quoteSharingAllowed": false
          },
          "searchInfo": {
            "textSnippet": "... \u003cb\u003eCode\u003c/b\u003e of Cali- fornia is hereby repealed . &quot; SEC . 107. Section nineteen hundred and sixty - nine of the Political \u003cb\u003eCode\u003c/b\u003e of Cali- fornia is hereby repealed . &quot; SEC . 108. Section two thousand and three , as approved April first&nbsp;..."
          }
        },
        {
          "kind": "books#volume",
          "id": "mKCdDwAAQBAJ",
          "etag": "YOppv+riVpU",
          "selfLink": "https://www.googleapis.com/books/v1/volumes/mKCdDwAAQBAJ",
          "volumeInfo": {
            "title": "Volume I: Genocide",
            "authors": [
              "Guénaël Mettraux"
            ],
            "publisher": "Oxford University Press",
            "publishedDate": "2019-06-18",
            "description": "Judge Mettraux's four-volume compendium, International Crimes: Law and Practice, will provide the most detailed and authoritative account to-date of the law of international crimes. It is a scholarly tour de force providing a unique blend of academic rigour and an insight into the practice of international criminal law. The compendium is un-rivalled in its breadth and depth, covering almost a century of legal practice, dozens of jurisdictions (national and international), thousands of decisions and judgments and hundreds of cases. This first volume discusses in detail the law of genocide: its definition, elements, normative status, and relationship to the other core international crimes. While the book is an invaluable tool for academics and researchers, it is particularly suited to legal practitioners, guiding the reader through the practical and evidential challenges associated with the prosecution of international crimes.",
            "industryIdentifiers": [
              {
                "type": "ISBN_13",
                "identifier": "9780192581075"
              },
              {
                "type": "ISBN_10",
                "identifier": "0192581074"
              }
            ],
            "readingModes": {
              "text": true,
              "image": true
            },
            "pageCount": 698,
            "printType": "BOOK",
            "categories": [
              "Law"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "1.1.1.0.preview.3",
            "panelizationSummary": {
              "containsEpubBubbles": false,
              "containsImageBubbles": false
            },
            "imageLinks": {
              "smallThumbnail": "http://books.google.com/books/content?id=mKCdDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
              "thumbnail": "http://books.google.com/books/content?id=mKCdDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=mKCdDwAAQBAJ&pg=PT247&dq=code&hl=&as_pt=BOOKS&cd=7&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=mKCdDwAAQBAJ&dq=code&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Volume_I_Genocide.html?hl=&id=mKCdDwAAQBAJ"
          },
          "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
          },
          "accessInfo": {
            "country": "IL",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
              "isAvailable": true,
              "acsTokenLink": "http://books.google.com/books/download/Volume_I_Genocide-sample-epub.acsm?id=mKCdDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "pdf": {
              "isAvailable": true,
              "acsTokenLink": "http://books.google.com/books/download/Volume_I_Genocide-sample-pdf.acsm?id=mKCdDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "webReaderLink": "http://play.google.com/books/reader?id=mKCdDwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
          },
          "searchInfo": {
            "textSnippet": "... \u003cb\u003eCode\u003c/b\u003e (1974, as of 2016), art. 57(1) (when read in conjunction with Article 321(1)); Belarus, Penal \u003cb\u003eCode\u003c/b\u003e (1999), art. 85; Belgium, Law Concerning the Repression of Grave Breaches of the Geneva Conventions and their Additional&nbsp;..."
          }
        }]

    const queryDebounce = useRef(
        debounce((query) =>{
            if(!query.trim()){
                console.log("im here")
                setSearchResults([])
                return
            }

            googleBookService.query({searchTerm: query})
                .then((books) => {
                    console.log("fetched books:",books)
                    setSearchResults(books)
                    console.log(searchResults)
                })
                .catch(err => console.error("Error fetching books:",err))
        },500)
    ).current


    useEffect(() =>{
       queryDebounce(searchTerm)
       console.log(searchTerm)
       
    },[searchTerm])

    useEffect(() => {
        console.log("Updated searchResults:", searchResults);
    }, [searchResults]);

    function handleChange(ev){
        setSearchTerm(ev.target.value)
    }

    async function onAddBook(book){
        bookService.addGoogleBook(book)
            .then(newBook =>{
                console.log("Adding Book" , newBook)
                setAddedBooks([...addedBooks,newBook])
                console.log("books added successfully")
            })
            .catch(err => console.error(`There was an error adding book`,err))
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        queryDebounce(searchTerm);
    }

    return(
        <div>
            <h2>Add new book</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search google books"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>
            
            <ul>
                {searchResults.map(book =>(
                    <li key={book.id}>
                        {book.volumeInfo.title}
                        <button onClick={() => onAddBook(book)}>+</button>
                        </li>
                ))}
            </ul>
            <Link to="/book">⬅ Back to Book List</Link>
        </div>
    )
}