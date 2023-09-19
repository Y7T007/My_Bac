const levels = [
    {
        name: 'Tronc commun (Classe de Seconde)',
        levelId: 'tc-s',
        subjects: [
            {
                name: 'Mathématiques',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Algèbre' },
                    { id: 2, name: 'Géométrie' },
                    { id: 3, name: 'Statistiques et probabilités' },
                    { id: 4, name: 'Trigonométrie' },
                    { id: 5, name: 'Calcul différentiel' },
                    { id: 6, name: 'Calcul intégral' }
                ]
            },
            {
                name: 'Français',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Littérature française' },
                    { id: 2, name: 'Grammaire et conjugaison' },
                    { id: 3, name: 'Rédaction et expression écrite' },
                    { id: 4, name: 'Étude de textes littéraires' },
                    { id: 5, name: 'Analyse de la langue' },
                    { id: 6, name: 'Histoire de la langue française' }
                ]
            },
            {
                name: 'Physique-Chimie',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Mécanique' },
                    { id: 2, name: 'Électricité et magnétisme' },
                    { id: 3, name: 'Optique' },
                    { id: 4, name: 'Thermodynamique' },
                    { id: 5, name: 'Cinématique' },
                    { id: 6, name: 'Chimie organique' }
                ]
            },
            {
                name: 'Histoire-Géographie',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Histoire ancienne' },
                    { id: 2, name: 'Histoire médiévale' },
                    { id: 3, name: 'Révolutions du XVIIIe siècle' },
                    { id: 4, name: 'Géographie physique' },
                    { id: 5, name: 'Géopolitique mondiale' },
                    { id: 6, name: 'Histoire contemporaine' }
                ]
            },
            {
                name: 'Sciences de la Vie et de la Terre (SVT)',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Biologie cellulaire' },
                    { id: 2, name: 'Génétique' },
                    { id: 3, name: 'Écologie' },
                    { id: 4, name: 'Évolution des espèces' },
                    { id: 5, name: 'Anatomie humaine' },
                    { id: 6, name: 'Sciences de l\'environnement' }
                ]
            },
            {
                name: 'Langues étrangères (ex: Anglais)',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Compréhension écrite et orale' },
                    { id: 2, name: 'Expression orale et écrite' },
                    { id: 3, name: 'Vocabulaire et grammaire' },
                    { id: 4, name: 'Traduction et interprétation' },
                    { id: 5, name: 'Culture et civilisation' },
                    { id: 6, name: 'Conversation et débats' }
                ]
            }
        ]
    },
    {
        name: 'Tronc commun (Classe de Seconde)',
        levelId: 'tc-l',
        subjects: [
            {
                name: 'Mathématiques',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Algèbre' },
                    { id: 2, name: 'Géométrie' },
                    { id: 3, name: 'Statistiques et probabilités' },
                    { id: 4, name: 'Trigonométrie' },
                    { id: 5, name: 'Calcul différentiel' },
                    { id: 6, name: 'Calcul intégral' }
                ]
            },
            {
                name: 'Français',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Littérature française' },
                    { id: 2, name: 'Grammaire et conjugaison' },
                    { id: 3, name: 'Rédaction et expression écrite' },
                    { id: 4, name: 'Étude de textes littéraires' },
                    { id: 5, name: 'Analyse de la langue' },
                    { id: 6, name: 'Histoire de la langue française' }
                ]
            },
            {
                name: 'Physique-Chimie',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Mécanique' },
                    { id: 2, name: 'Électricité et magnétisme' },
                    { id: 3, name: 'Optique' },
                    { id: 4, name: 'Thermodynamique' },
                    { id: 5, name: 'Cinématique' },
                    { id: 6, name: 'Chimie organique' }
                ]
            },
            {
                name: 'Histoire-Géographie',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Histoire ancienne' },
                    { id: 2, name: 'Histoire médiévale' },
                    { id: 3, name: 'Révolutions du XVIIIe siècle' },
                    { id: 4, name: 'Géographie physique' },
                    { id: 5, name: 'Géopolitique mondiale' },
                    { id: 6, name: 'Histoire contemporaine' }
                ]
            },
            {
                name: 'Sciences de la Vie et de la Terre (SVT)',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Biologie cellulaire' },
                    { id: 2, name: 'Génétique' },
                    { id: 3, name: 'Écologie' },
                    { id: 4, name: 'Évolution des espèces' },
                    { id: 5, name: 'Anatomie humaine' },
                    { id: 6, name: 'Sciences de l\'environnement' }
                ]
            },
            {
                name: 'Langues étrangères (ex: Anglais)',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Compréhension écrite et orale' },
                    { id: 2, name: 'Expression orale et écrite' },
                    { id: 3, name: 'Vocabulaire et grammaire' },
                    { id: 4, name: 'Traduction et interprétation' },
                    { id: 5, name: 'Culture et civilisation' },
                    { id: 6, name: 'Conversation et débats' }
                ]
            }
        ]
    },
    {
        name: '1er Bac (Classe de Première)',
        levelId: '1bac-s',
        subjects: [
            {
                name: 'Philosophie',
                key:'philo',
                color: '#4287f5',
                Chapters: [
                    { id: 1, name: 'Théories philosophiques' },
                    { id: 2, name: 'Philosophie morale' },
                    { id: 3, name: 'Métaphysique' },
                    { id: 4, name: 'Éthique et politique' },
                    { id: 5, name: 'Philosophie de l\'art' },
                    { id: 6, name: 'Philosophie des sciences' }
                ]
            },
            {
                name: '(SES)',
                key:'SES',
                color: '#ff7675',
                Chapters: [
                    { id: 1, name: 'Microéconomie' },
                    { id: 2, name: 'Macroéconomie' },
                    { id: 3, name: 'Sociologie' },
                    { id: 4, name: 'Économie du travail' },
                    { id: 5, name: 'Économie internationale' },
                    { id: 6, name: 'Économie du développement' }
                ]
            },
            {
                name: 'Langue et Littérature',
                key:'LL',
                color: '#6ab04c',
                Chapters: [
                    { id: 1, name: 'Analyse de textes littéraires' },
                    { id: 2, name: 'Expression écrite avancée' },
                    { id: 3, name: 'Grammaire et stylistique' },
                    { id: 4, name: 'Étude du théâtre' },
                    { id: 5, name: 'Roman et récit' },
                    { id: 6, name: 'Poésie et lyrisme' }
                ]
            },
            {
                name: 'Mathématiques',
                key:'Maths',
                color: '#f64747',
                Chapters: [
                    { id: 1, name: 'Les Limites' },
                    { id: 2, name: 'Algèbre linéaire' },
                    { id: 3, name: 'Probabilités et statistiques' },
                    { id: 4, name: 'Géométrie avancée' },
                    { id: 5, name: 'Calcul vectoriel' },
                    { id: 6, name: 'Équations différentielles' }
                ]
            },
            {
                name: 'Physique-Chimie',
                key:'PC',
                color: '#ffa94d',
                Chapters: [
                    { id: 1, name: 'Mécanique quantique' },
                    { id: 2, name: 'Électromagnétisme avancé' },
                    { id: 3, name: 'Chimie organique avancée' },
                    { id: 4, name: 'Cinétique chimique' },
                    { id: 5, name: 'Thermochimie' },
                    { id: 6, name: 'Électronique' }
                ]
            },
            {
                name: 'Espagnol',
                key:'ESP',
                color: '#af65a1',
                Chapters: [
                    { id: 1, name: 'Compréhension de textes littéraires' },
                    { id: 2, name: 'Expression écrite avancée' },
                    { id: 3, name: 'Langue orale et conversation' },
                    { id: 4, name: 'Civilisation et culture' },
                    { id: 5, name: 'Traduction et rédaction spécialisée' },
                    { id: 6, name: 'Étude de l\'art et de la littérature hispanique' }
                ]
            }
        ]
    },
    {
        name: '1er Bac (Classe de Première)',
        levelId: '1bac-l',
        subjects: [
            {
                name: 'Philosophie',
                key:'philo',
                color: '#4287f5',
                Chapters: [
                    { id: 1, name: 'Théories philosophiques' },
                    { id: 2, name: 'Philosophie morale' },
                    { id: 3, name: 'Métaphysique' },
                    { id: 4, name: 'Éthique et politique' },
                    { id: 5, name: 'Philosophie de l\'art' },
                    { id: 6, name: 'Philosophie des sciences' }
                ]
            },
            {
                name: '(SES)',
                key:'SES',
                color: '#ff7675',
                Chapters: [
                    { id: 1, name: 'Microéconomie' },
                    { id: 2, name: 'Macroéconomie' },
                    { id: 3, name: 'Sociologie' },
                    { id: 4, name: 'Économie du travail' },
                    { id: 5, name: 'Économie internationale' },
                    { id: 6, name: 'Économie du développement' }
                ]
            },
            {
                name: 'Langue et Littérature',
                key:'LL',
                color: '#6ab04c',
                Chapters: [
                    { id: 1, name: 'Analyse de textes littéraires' },
                    { id: 2, name: 'Expression écrite avancée' },
                    { id: 3, name: 'Grammaire et stylistique' },
                    { id: 4, name: 'Étude du théâtre' },
                    { id: 5, name: 'Roman et récit' },
                    { id: 6, name: 'Poésie et lyrisme' }
                ]
            },
            {
                name: 'Mathématiques',
                key:'Maths',
                color: '#f64747',
                Chapters: [
                    { id: 1, name: 'Les Limites' },
                    { id: 2, name: 'Algèbre linéaire' },
                    { id: 3, name: 'Probabilités et statistiques' },
                    { id: 4, name: 'Géométrie avancée' },
                    { id: 5, name: 'Calcul vectoriel' },
                    { id: 6, name: 'Équations différentielles' }
                ]
            },
            {
                name: 'Physique-Chimie',
                key:'PC',
                color: '#ffa94d',
                Chapters: [
                    { id: 1, name: 'Mécanique quantique' },
                    { id: 2, name: 'Électromagnétisme avancé' },
                    { id: 3, name: 'Chimie organique avancée' },
                    { id: 4, name: 'Cinétique chimique' },
                    { id: 5, name: 'Thermochimie' },
                    { id: 6, name: 'Électronique' }
                ]
            },
            {
                name: 'Espagnol',
                key:'ESP',
                color: '#af65a1',
                Chapters: [
                    { id: 1, name: 'Compréhension de textes littéraires' },
                    { id: 2, name: 'Expression écrite avancée' },
                    { id: 3, name: 'Langue orale et conversation' },
                    { id: 4, name: 'Civilisation et culture' },
                    { id: 5, name: 'Traduction et rédaction spécialisée' },
                    { id: 6, name: 'Étude de l\'art et de la littérature hispanique' }
                ]
            }
        ]
    },
    {
        name: '2ème Bac (Classe de Terminale)',
        levelId: '2bac-sx',
        subjects: [
            {
                name: 'Mathématiques Avancées',
                key:'Maths',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Analyse complexe' },
                    { id: 2, name: 'Algèbre avancée' },
                    { id: 3, name: 'Topologie' },
                    { id: 4, name: 'Probabilités avancées' },
                    { id: 5, name: 'Logique mathématique' },
                    { id: 6, name: 'Théorie des nombres' }
                ]
            },
            {
                name: 'Sciences de l\'Ingénieur',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Mécanique des fluides' },
                    { id: 2, name: 'Résistance des matériaux' },
                    { id: 3, name: 'Automatique et régulation' },
                    { id: 4, name: 'Électrotechnique' },
                    { id: 5, name: 'Informatique et programmation' },
                    { id: 6, name: 'Conception mécanique' }
                ]
            },
            {
                name: 'Philosophie approfondie',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Philosophie politique' },
                    { id: 2, name: 'Épistémologie' },
                    { id: 3, name: 'Philosophie du langage' },
                    { id: 4, name: 'Philosophie de l\'histoire' },
                    { id: 5, name: 'Philosophie des sciences sociales' },
                    { id: 6, name: 'Métaphysique avancée' }
                ]
            },
            {
                name: 'Histoire-Géographie avancée',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Histoire contemporaine approfondie' },
                    { id: 2, name: 'Géographie humaine' },
                    { id: 3, name: 'Géopolitique avancée' },
                    { id: 4, name: 'Histoire de l\'art' },
                    { id: 5, name: 'Histoire des idées politiques' },
                    { id: 6, name: 'Géographie économique' }
                ]
            },
            {
                name: 'Sciences de la Vie et de la Terre (SVT) approfondies',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Génétique moléculaire' },
                    { id: 2, name: 'Biologie moléculaire' },
                    { id: 3, name: 'Neurobiologie' },
                    { id: 4, name: 'Biologie évolutive' },
                    { id: 5, name: 'Paléontologie' },
                    { id: 6, name: 'Écologie avancée' }
                ]
            },
            {
                name: 'Langues étrangères (ex: Allemand)',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Littérature allemande' },
                    { id: 2, name: 'Expression écrite avancée' },
                    { id: 3, name: 'Langue orale et débats' },
                    { id: 4, name: 'Civilisation germanique' },
                    { id: 5, name: 'Traduction spécialisée' },
                    { id: 6, name: 'Langue des affaires' }
                ]
            }
        ]
    },
    {
        name: '2ème Bac (Classe de Terminale)',
        levelId: '2bac-spc',
        subjects: [
            {
                name: 'Mathématiques Avancées',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Analyse complexe' },
                    { id: 2, name: 'Algèbre avancée' },
                    { id: 3, name: 'Topologie' },
                    { id: 4, name: 'Probabilités avancées' },
                    { id: 5, name: 'Logique mathématique' },
                    { id: 6, name: 'Théorie des nombres' }
                ]
            },
            {
                name: 'Sciences de l\'Ingénieur',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Mécanique des fluides' },
                    { id: 2, name: 'Résistance des matériaux' },
                    { id: 3, name: 'Automatique et régulation' },
                    { id: 4, name: 'Électrotechnique' },
                    { id: 5, name: 'Informatique et programmation' },
                    { id: 6, name: 'Conception mécanique' }
                ]
            },
            {
                name: 'Philosophie approfondie',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Philosophie politique' },
                    { id: 2, name: 'Épistémologie' },
                    { id: 3, name: 'Philosophie du langage' },
                    { id: 4, name: 'Philosophie de l\'histoire' },
                    { id: 5, name: 'Philosophie des sciences sociales' },
                    { id: 6, name: 'Métaphysique avancée' }
                ]
            },
            {
                name: 'Histoire-Géographie avancée',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Histoire contemporaine approfondie' },
                    { id: 2, name: 'Géographie humaine' },
                    { id: 3, name: 'Géopolitique avancée' },
                    { id: 4, name: 'Histoire de l\'art' },
                    { id: 5, name: 'Histoire des idées politiques' },
                    { id: 6, name: 'Géographie économique' }
                ]
            },
            {
                name: 'Sciences de la Vie et de la Terre (SVT) approfondies',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Génétique moléculaire' },
                    { id: 2, name: 'Biologie moléculaire' },
                    { id: 3, name: 'Neurobiologie' },
                    { id: 4, name: 'Biologie évolutive' },
                    { id: 5, name: 'Paléontologie' },
                    { id: 6, name: 'Écologie avancée' }
                ]
            },
            {
                name: 'Langues étrangères (ex: Allemand)',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Littérature allemande' },
                    { id: 2, name: 'Expression écrite avancée' },
                    { id: 3, name: 'Langue orale et débats' },
                    { id: 4, name: 'Civilisation germanique' },
                    { id: 5, name: 'Traduction spécialisée' },
                    { id: 6, name: 'Langue des affaires' }
                ]
            }
        ]
    },
    {
        name: '2ème Bac (Classe de Terminale)',
        levelId: '2bac-ssma',
        subjects: [
            {
                name: 'Mathématiques Avancées',
                key:'Maths',
                color: '#1e5aff',
                Chapters: [
                    { id: 1, name: 'Analyse complexe' },
                    { id: 2, name: 'Algèbre avancée' },
                    { id: 3, name: 'Topologie' },
                    { id: 4, name: 'Probabilités avancées' },
                    { id: 5, name: 'Logique mathématique' },
                    { id: 6, name: 'Théorie des nombres' }
                ]
            },
            {
                name: 'Sciences de l\'Ingénieur',
                key:'SI',
                color: '#b449ff',
                Chapters: [
                    { id: 1, name: 'Mécanique des fluides' },
                    { id: 2, name: 'Résistance des matériaux' },
                    { id: 3, name: 'Automatique et régulation' },
                    { id: 4, name: 'Électrotechnique' },
                    { id: 5, name: 'Informatique et programmation' },
                    { id: 6, name: 'Conception mécanique' }
                ]
            },
            {
                name: 'Philosophie approfondie',
                color: '#00825d',
                key:'Philo',
                Chapters: [
                    { id: 1, name: 'Philosophie politique' },
                    { id: 2, name: 'Épistémologie' },
                    { id: 3, name: 'Philosophie du langage' },
                    { id: 4, name: 'Philosophie de l\'histoire' },
                    { id: 5, name: 'Philosophie des sciences sociales' },
                    { id: 6, name: 'Métaphysique avancée' }
                ]
            },
            {
                name: 'Histoire-Géographie avancée',
                color: '#6ab04c',
                key:'HG',
                Chapters: [
                    { id: 1, name: 'Histoire contemporaine approfondie' },
                    { id: 2, name: 'Géographie humaine' },
                    { id: 3, name: 'Géopolitique avancée' },
                    { id: 4, name: 'Histoire de l\'art' },
                    { id: 5, name: 'Histoire des idées politiques' },
                    { id: 6, name: 'Géographie économique' }
                ]
            },
            {
                name: 'Sciences de la Vie et de la Terre (SVT) approfondies',
                color: '#ff7675',
                key:'SVT',
                Chapters: [
                    { id: 1, name: 'Génétique moléculaire' },
                    { id: 2, name: 'Biologie moléculaire' },
                    { id: 3, name: 'Neurobiologie' },
                    { id: 4, name: 'Biologie évolutive' },
                    { id: 5, name: 'Paléontologie' },
                    { id: 6, name: 'Écologie avancée' }
                ]
            },
            {
                name: 'Langues étrangères (ex: Allemand)',
                color: '#ffa94d',
                key:'Ang',
                Chapters: [
                    { id: 1, name: 'Littérature allemande' },
                    { id: 2, name: 'Expression écrite avancée' },
                    { id: 3, name: 'Langue orale et débats' },
                    { id: 4, name: 'Civilisation germanique' },
                    { id: 5, name: 'Traduction spécialisée' },
                    { id: 6, name: 'Langue des affaires' }
                ]
            }
        ]
    },
    {
        name: '2ème Bac (Classe de Terminale)',
        levelId: '2bac-ssmb',
        subjects: [
            {
                name: 'Mathématiques Avancées',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Analyse complexe' },
                    { id: 2, name: 'Algèbre avancée' },
                    { id: 3, name: 'Topologie' },
                    { id: 4, name: 'Probabilités avancées' },
                    { id: 5, name: 'Logique mathématique' },
                    { id: 6, name: 'Théorie des nombres' }
                ]
            },
            {
                name: 'Sciences de l\'Ingénieur',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Mécanique des fluides' },
                    { id: 2, name: 'Résistance des matériaux' },
                    { id: 3, name: 'Automatique et régulation' },
                    { id: 4, name: 'Électrotechnique' },
                    { id: 5, name: 'Informatique et programmation' },
                    { id: 6, name: 'Conception mécanique' }
                ]
            },
            {
                name: 'Philosophie approfondie',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Philosophie politique' },
                    { id: 2, name: 'Épistémologie' },
                    { id: 3, name: 'Philosophie du langage' },
                    { id: 4, name: 'Philosophie de l\'histoire' },
                    { id: 5, name: 'Philosophie des sciences sociales' },
                    { id: 6, name: 'Métaphysique avancée' }
                ]
            },
            {
                name: 'Histoire-Géographie avancée',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Histoire contemporaine approfondie' },
                    { id: 2, name: 'Géographie humaine' },
                    { id: 3, name: 'Géopolitique avancée' },
                    { id: 4, name: 'Histoire de l\'art' },
                    { id: 5, name: 'Histoire des idées politiques' },
                    { id: 6, name: 'Géographie économique' }
                ]
            },
            {
                name: 'Sciences de la Vie et de la Terre (SVT) approfondies',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Génétique moléculaire' },
                    { id: 2, name: 'Biologie moléculaire' },
                    { id: 3, name: 'Neurobiologie' },
                    { id: 4, name: 'Biologie évolutive' },
                    { id: 5, name: 'Paléontologie' },
                    { id: 6, name: 'Écologie avancée' }
                ]
            },
            {
                name: 'Langues étrangères (ex: Allemand)',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Littérature allemande' },
                    { id: 2, name: 'Expression écrite avancée' },
                    { id: 3, name: 'Langue orale et débats' },
                    { id: 4, name: 'Civilisation germanique' },
                    { id: 5, name: 'Traduction spécialisée' },
                    { id: 6, name: 'Langue des affaires' }
                ]
            }
        ]
    },
    {
        name: '2ème Bac (Classe de Terminale)',
        levelId: '2bac-l',
        subjects: [
            {
                name: 'Mathématiques Avancées',
                key:'Maths',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Analyse complexe' },
                    { id: 2, name: 'Algèbre avancée' },
                    { id: 3, name: 'Topologie' },
                    { id: 4, name: 'Probabilités avancées' },
                    { id: 5, name: 'Logique mathématique' },
                    { id: 6, name: 'Théorie des nombres' }
                ]
            },
            {
                name: 'Sciences de l\'Ingénieur',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Mécanique des fluides' },
                    { id: 2, name: 'Résistance des matériaux' },
                    { id: 3, name: 'Automatique et régulation' },
                    { id: 4, name: 'Électrotechnique' },
                    { id: 5, name: 'Informatique et programmation' },
                    { id: 6, name: 'Conception mécanique' }
                ]
            },
            {
                name: 'Philosophie approfondie',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Philosophie politique' },
                    { id: 2, name: 'Épistémologie' },
                    { id: 3, name: 'Philosophie du langage' },
                    { id: 4, name: 'Philosophie de l\'histoire' },
                    { id: 5, name: 'Philosophie des sciences sociales' },
                    { id: 6, name: 'Métaphysique avancée' }
                ]
            },
            {
                name: 'Histoire-Géographie avancée',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Histoire contemporaine approfondie' },
                    { id: 2, name: 'Géographie humaine' },
                    { id: 3, name: 'Géopolitique avancée' },
                    { id: 4, name: 'Histoire de l\'art' },
                    { id: 5, name: 'Histoire des idées politiques' },
                    { id: 6, name: 'Géographie économique' }
                ]
            },
            {
                name: 'Sciences de la Vie et de la Terre (SVT) approfondies',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Génétique moléculaire' },
                    { id: 2, name: 'Biologie moléculaire' },
                    { id: 3, name: 'Neurobiologie' },
                    { id: 4, name: 'Biologie évolutive' },
                    { id: 5, name: 'Paléontologie' },
                    { id: 6, name: 'Écologie avancée' }
                ]
            },
            {
                name: 'Langues étrangères (ex: Allemand)',
                color: '1e5aff',
                Chapters: [
                    { id: 1, name: 'Littérature allemande' },
                    { id: 2, name: 'Expression écrite avancée' },
                    { id: 3, name: 'Langue orale et débats' },
                    { id: 4, name: 'Civilisation germanique' },
                    { id: 5, name: 'Traduction spécialisée' },
                    { id: 6, name: 'Langue des affaires' }
                ]
            }
        ]
    }
];

export default levels;