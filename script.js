document.addEventListener('DOMContentLoaded', function() {
    // Make PharmaTrade text clickable
    const logoText = document.querySelector('.logo h1');
    if (logoText) {
        logoText.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mobile menu functionality
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const navLinks = document.getElementById('navLinks');
    
    if (openMenu && closeMenu && navLinks) {
        openMenu.addEventListener('click', function() {
            navLinks.classList.add('active');
        });
        
        closeMenu.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
        
        // Close menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('productSearch');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput && searchButton) {
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // If search is empty, show all products for the current category
                const activeCategory = document.querySelector('.category-item.active').dataset.category;
                setActiveCategory(activeCategory);
                return;
            }
            
            // Search across all categories
            filterProductsBySearchAllCategories(searchTerm);
        }
        
        searchButton.addEventListener('click', performSearch);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Add input event to handle clearing the search box
        searchInput.addEventListener('input', function() {
            if (this.value === '') {
                const activeCategory = document.querySelector('.category-item.active').dataset.category;
                setActiveCategory(activeCategory);
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Product category filtering
    const categoryItems = document.querySelectorAll('.category-item');
    const productCards = document.getElementById('productCards');
    
    // Product data from card.txt
    const productData = {
        'animal': [
            {
                title: 'ANIMAL HEALTH PRODUCTS',
                items: [
                    'Marbofloxacin', 'Afoxolaner', 'Albendazole', 'Apramycin Sulfate',
                    'Bacitracin Zinc', 'Butaphosphan', 'Cefovecin Sodium', 'Colistin Sulfate',
                    'Diclazuril', 'Difloxacin hydrochloride', 'Doxycycline HCL', 'Enrofloxacin',
                    'Florfenicol', 'Flunixin Meglumine', 'Fluralaner', 'Gentamycin Sulfate',
                    'Griseofulvin', 'Ivermectin', 'Kitasamycin Tartrate', 'Levamisole HCL',
                    'Lincomycin HCL', 'Milbemycin oxime', 'Moxidectin'
                ]
            },
            {
                title: 'ANIMAL FEED ADDITIVES',
                items: [
                    'Choline Chloride 75%', 'Choline Chloride (70%, 60%, 50%, Corn Cob as carrier)',
                    'Choline Chloride 50% (Silica As Carrier)', 'Betaine Hcl 98%', 'Allicin 25%',
                    'Allicin 98% 99%', 'Probiotic', 'Yeast powder 45% to 70%', 'Brewer yeast 40% to 45%',
                    'Meat And Bone Meal', 'Dcp 18%', 'Calcium Dihydrogen Phosphate 22%',
                    'Calcium Lactate (Of Feed Grade)99%', 'Lysine hcl 98.5%', 'Lysine70%',
                    'Vitamin', 'Mixing feed additive', 'Oregano oil 80% 90% 98%', 'Oregano oil 10% 20%',
                    'Betaine Anhydrous 96% 98%', 'Calcium Formate 98%'
                ]
            }
        ],
        'pharmaceuticals': [
            {
                title: 'ANTIBIOTICS',
                items: [
                    'Azithromycin', 'Clarithromycin', 'Erythromycin Thiocyanate', 'Ciprofloxacin Hydrochloride',
                    'Levofloxacin Hemihydrate', 'Moxifloxacin Hydrochloride', 'Norfloxacin', 'Ofloxacin',
                    'Amoxicillin Trihydrate', 'Ampicillin Trihydrate', 'Penicillin V Potassium', 'Aztreonam',
                    'Biapenem', 'Faropenem Sodium Hemipentahydrate', 'Imipenem-Cilastatin', 'Meropenem',
                    'Metronidazole', 'Chloramphenicol', 'Culftehlortetracycline Hydrochloride', 'Clindamycin Phosphate/HCL',
                    'Furazolidone', 'Fusidate Sodium', 'Isoniazid', 'Kanamycin Sulfate',
                    'Lincomycin Hydrochloride', 'Minocycline Hydrochloride', 'Nitrofurantoin', 'Rifampicin',
                    'Thiamphenicol', 'Tetracycline Hydrochloride', 'Vancomycin Hydrochloride', 'Cefalexin',
                    'Cefazolin Sodium', 'Cefradine', 'Cefadroxil', 'Cefaclor',
                    'Cefuroxime Axetil', 'Ceftriaxone Sodium', 'Cefotaxime Sodium', 'Cefoperazone Sodium',
                    'Ceftiofur Hydrochloride', 'Vancomycin', 'Daptomycin', 'Bleomycine',
                    'Polymyxin B', 'Ceftaroline Fosamil', 'Furaltadone HCL', 'Polymyxin B Sulphate'
                ]
            },
            {
                title: 'ANTI-INFLAMMATORY',
                items: [
                    'Iguratimode', 'Imrecoxib', 'Tofacitinib Citrate', 'Mirogabalin Besylate',
                    'Nepafenac', 'Ubrogepant', 'Rimegepant sulfate hydrate', 'Upadacitinib hemihydrate',
                    'Celecoxib', 'Baricitinib', 'Pimecrolimus', 'Dantrolene sodium',
                    'Tofacinitib citrate', 'Lasmiditan Succinate', 'Phloroglucinol', 'Aspirin',
                    'Diclofenac Potassium /Sodium', 'Indomethacin', 'Ketoprofen', 'Levodopa',
                    'Paracetamol', 'Meloxicam', 'Naproxen Base/Sodium', 'Piroxicam'
                ]
            },
            {
                title: 'ANTIVIRAL',
                items: [
                    'Acyclovir', 'Amantadine Hydrochloride', 'Daclatasvir', 'Entecavir',
                    'Ganciclovir', 'Lamivudine', 'Nevirapine', 'Ribavirin',
                    'Sofosbuvir', 'Tenofovir Disoproxil Fumarate', 'Valacyclovir', 'Baloxavir Marboxil',
                    'Baloxavir', 'Ganciclovir', 'Valganciclovir Hydrochloride'
                ]
            },
            {
                title: 'ANTIFUNGAL',
                items: [
                    'Clotrimazole', 'Griseofulvin', 'Terbinafine Hydrochloride', 'Posaconazole',
                    'Isavuconazole', 'Efinaconzole', 'Oseltamivir Phosphate', 'Caspofungin Acetate',
                    'Micafungin Sodium', 'Luliconazole'
                ]
            },
            {
                title: 'ANTIPARASITIC',
                items: [
                    'Antimony Potassium Tartrate', 'Niclosamide', 'Oxantel Pamoate', 'Artemisinin',
                    'Lumefantrine'
                ]
            },
            {
                title: 'ENZYME',
                items: [
                    'Bromelain', 'Chymotrypsin', 'Lactase', 'Papain', 'Trypsin-Chymotrypsin'
                ]
            },
            {
                title: 'DIET DRUGS',
                items: [
                    'Orlistat'
                ]
            },
            {
                title: 'CARDIOVASCULAR AGENTS',
                items: [
                    'Atorvastatin Calcium', 'Azilsartan Medoxomil', 'Candesartan', 'Captopril',
                    'Enalapril Maleate', 'Fenofibrate', 'Heparin Sodium', 'Hydrochlorothiazide',
                    'Indapamide', 'Irbesartan', 'Lisinopril', 'Losartan Potassium',
                    'Lovastatin', 'Methyldopa', 'Minoxidil', 'Nifedipine',
                    'Pitavastatin Calcium', 'Propranolol HCL', 'Ramipril', 'Rosuvastatin Calcium',
                    'Simvastatin', 'Spironolactone', 'Telmisartan', 'Valsartan',
                    'Dronedarone hydrochloride', 'Azilsartan Medoxomil Potassium', 'Aprocitentan', 'Mavacamten',
                    'Bempedoic Acid'
                ]
            },
            {
                title: 'ANTIDIABETIC DRUGS',
                items: [
                    'Acarbose', 'Dapagliflozin Propanediol Monohydrate', 'Empagliflozin', 'Ertugliflozin L-Pyroglutamic Acid',
                    'Gliclazide', 'Linagliptin', 'Metformin HCL', 'Omarigliptin',
                    'Semaglutide', 'Sitagliptin Phosphate', 'Sotagliflozin', 'Trizepatide',
                    'Finerenone', 'Lobeglitazone Sulfate', 'Tirzepatide', 'Liraglutide',
                    'Semagalutide'
                ]
            },
            {
                title: 'GASTROINTESTINAL AGENTS',
                items: [
                    'Cimetidine Type A/AB', 'Granisetron Hydrochloride', 'Ondansetron Hydrochloride', 'Pancreatin',
                    'Rebamipide', 'Sucralfate', 'Sulpiride', 'Trimebutine Maleate',
                    'Ursodeoxycholic Acid', 'Vonoprazan fumarate', 'Levocarnitine'
                ]
            },
            {
                title: 'CENTRAL NERVOUS SYSTEM AGENTS',
                items: [
                    'Clozapine', 'Lithium Carbonate', 'Venlafaxine Hydrochloride', 'Betahistine Mesylate',
                    'Pimavanserin Tartarate', 'Cenobamate', 'Palonosetron HCL', 'Netupitant',
                    'Oxcarbazepine', 'Eslicarbazepine Acetate', 'Escitalopram Oxalate', 'Citalopram Hydrobromide',
                    'Cariprazine Hydrochloride'
                ]
            },
            {
                title: 'HORMONE AND STEROIDS',
                items: [
                    'Betamethasone', 'Budesonide', 'Clobetasol', 'Cyproterone Acetate',
                    'Desogestrel', 'Deflazacort', 'Dexamethasone', 'Dydrogesterone',
                    'Estradiol', 'Ethinylestradiol', 'Finasteride', 'Fluticasone Propionate',
                    'Fludrocortisone Acetate', 'Fluocinolone Acetonide', 'Hydrocortisone Base/Acetate', 'Lynestrenol',
                    'Medroxyprogesterone Acetate', 'Megestrol Acetate', 'Mometasone Furoate', 'Methylprednisolone',
                    'Mifepristone', 'Oxytocin', 'Prednisolone', 'Prednisolone Sodium Phosphate',
                    'Triamcinolone Acetonide', 'Ulipristal Acetate', 'Loteprednol etabonate', 'Progesterone',
                    'Pregnenolone', 'Levonorgestrel', 'Norethisterone', 'Norethisterone Acetate',
                    'Norethisterone Enanthate', 'Drospirenone', 'Gestodene', 'Estriol',
                    'Estradiol Valerate', 'Estradiol Cypionate', 'Tibolone', 'Dienogest',
                    'Exemestane', 'Dutasteride', 'Abiraterone Acetate', 'Darolutamide',
                    'Testosterone', 'Testosterone Undecanoate', 'Testosterone Cypionate', 'Testosterone Enanthate',
                    'Testosterone Propionate', 'DHEA(Prasterone)', 'Clascoterone', 'Budesonide',
                    'Desonide', 'Eplerenone', 'Methylprednisolone Hemisuccinate', 'Fluticasone Furoate',
                    'Apalutamide', 'Relugolix'
                ]
            },
            {
                title: 'RESPIRATORY',
                items: [
                    'Ambroxol Hydrochloride', 'Acetylcysteine', 'Bromhexine Hydrochloride', 'Carbocisteine',
                    'Revefenacin'
                ]
            },
            {
                title: 'ANTICANCER DRUGS',
                items: [
                    'Betahistine Mesylate', 'Bendamustine', 'Capecitabine Hydrochloride', 'Erlotinib Hydrochloride',
                    'Everolimus', 'Gefitinib', 'Gemcitabine', 'Irinotecan Hydrochloride',
                    'Imatinib Mesylate', 'Lenalidomide', 'Letrozole', 'Anastrozole',
                    'Fulvestrant', 'Everolimus', 'Enzalutamide', 'Lapatinib Ditosylate',
                    'Eribulin Mesylate', 'Sunitinib', 'Olaparib', 'Palbociclib',
                    'Ribociclib', 'Osimertinib Mesylate', 'Ruxolitinib phosphate', 'Abemaciclib',
                    'Paclitaxl Semi Synthetic Natural', 'Docetaxel anhydrous', 'Docetaxel Trihydrate', 'Cabazitaxel',
                    'Etoposide', 'Irinotecan HCL Trihydrate', 'Vinblastine Sulfate', 'Vincristine Sulfate',
                    'Vinorelbine Tartarate', 'Methotrexate'
                ]
            }
        ],
        'nutraceuticals': [
            {
                title: 'NUTRACEUTICALS',
                items: [
                    'Alpha-Lipoic Acid', 'Calcipotriol', 'Calcium Gluconate', 'Iron Dextran',
                    'Iohexol', 'Iopamidol', 'L-carnitine', 'Nepafenac',
                    'Sulfamethoxazole', 'Sodium Chloride', 'Tolperisone Hydrochloride', 'Tranexamic Acid',
                    'Trimethoprim', 'Bicyclol', 'Ritlecitinib Tosylate', 'Etrasimod Arginine',
                    'Avatrombopag Maleat', 'Avanafil', 'Febuxostat', 'Pidotimod',
                    'Ataluren (PTC124)', 'Topiroxostrat', 'Tacrolimus', 'Febuxoatat',
                    'Mirabegron', 'Vibegron', 'Tadalafil', '1,3,5-Trimethoxybenzene',
                    'Ursodeoxycholic Acid', 'Tauroursodeoxycholic Acid', 'Cholesterol', 'Omega-3-Acid Ethyl Ethers 90',
                    'Medium-Chain Triglycerides', 'Benzalkonium Chloride', 'Olive Oil (For Injection)', 'Egg phospholipids (For Injection)',
                    'SNAC', 'Empty Hard Gelatin Capsule', 'Povidone Iodine'
                ]
            },
            {
                title: 'FOOD ADDITIVES & VITAMINS',
                items: [
                    'Alpha Arbutin', 'Alpha Lipoic Acid', 'Aspartame', 'Beta-Alanine',
                    'Coenzyme Q10', 'D-Tartaric acid', 'DL-Malic acid', 'Fumaric Acid',
                    'GABA', 'Methyl Sulfonyl Methane', 'L-Carnitine Tartrate', 'L-Glutathione Reduced',
                    'L-Lysine Hcl', 'L-Pyroline', 'L-Pyroglutamic Acid', 'Silymarin',
                    'Sodium Citrate', 'Sodium Hyaluronate', 'Soy Protein Isolate', 'Sorbic acid',
                    'Sucralose', 'Vitamin C', '5-HTP'
                ]
            }
        ],
        'plant-extracts': [
            {
                title: 'PLANT EXTRACTS',
                items: [
                    'Avena Sativa Extract 4:1', 'Arbutine', 'Chicory Extract', 'Citrus Aurantinum Extract',
                    'Deoxyarbutin', 'Diosmin', 'Echinacea Extract', 'Epimedium Extract',
                    'Ginger Extract', 'Ginkgo flavone glycosides', 'Total terpene lactones', 'Grapefruit Seed Extract',
                    'Hawthorn Flavones', 'Hesperidin', 'Evening primrose oil', 'Horsetail Extract',
                    'Huperzia serrata Extract', 'L-(+)Rhamnose,monohydrate', 'Luteolin', 'Lycopene',
                    'Maca Root Extract', 'Mulberry Leaf Extract', 'Naringin', 'Polygonum Extract',
                    'Pomegranate Extract', 'Pueraria', 'Quercetin', 'Red Clover plant Extract',
                    'Reishi Mushroom Extract', 'Reseverratrol', 'Rose hip Extract', 'Rutin',
                    'Salisorosides Rosavin', 'Silymarin', 'Stigmasterol', 'Tea Polyphenols,Catchines,EGCG',
                    'Tribulus Terrestris Extract', 'Troxerutin', 'Turmeric Extract', 'Wolfberry Extract',
                    'Wild Yam Extract'
                ]
            }
        ],
        'new-products': [
            {
                title: 'NEW PRODUCTS',
                items: [
                    'Daprodustat', 'Deucravacitinib', 'Dotinurad', 'Entrectinib',
                    'Finerenone', 'Lorlatinib', 'Omarigliptine', 'Osimertinib',
                    'Pacetinib citrate', 'Palbociclib', 'Ribociclib', 'Roxadustat',
                    'Sotorasib(AMG510)', 'Tapinarof', 'Tucatinib', 'Upadacitinib hemihydrate',
                    'Vericiguat', 'Vonoprazan Fumarate', 'Voxelotor', 'Zuranolone'
                ]
            }
        ]
    };
    
    // Function to create product cards
    function createProductCards(category) {
        if (!productData[category]) return;
        
        productCards.innerHTML = '';
        
        productData[category].forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            const cardHeader = document.createElement('div');
            cardHeader.className = 'product-card-header';
            cardHeader.innerHTML = `<h3>${product.title}</h3>`;
            
            const cardBody = document.createElement('div');
            cardBody.className = 'product-card-body';
            
            const itemsList = document.createElement('ul');
            itemsList.className = 'product-items';
            
            product.items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                itemsList.appendChild(listItem);
            });
            
            cardBody.appendChild(itemsList);
            
            // Add See More button if items are more than 10
            if (product.items.length > 10) {
                const seeMoreBtn = document.createElement('div');
                seeMoreBtn.className = 'see-more-btn';
                seeMoreBtn.textContent = 'See More';
                
                seeMoreBtn.addEventListener('click', function() {
                    if (card.classList.contains('expanded')) {
                        card.classList.remove('expanded');
                        seeMoreBtn.textContent = 'See More';
                    } else {
                        card.classList.add('expanded');
                        seeMoreBtn.textContent = 'See Less';
                    }
                });
                
                cardBody.appendChild(seeMoreBtn);
            }
            
            card.appendChild(cardHeader);
            card.appendChild(cardBody);
            productCards.appendChild(card);
        });
    }
    
    // Function to filter products by search term in a specific category
    function filterProductsBySearch(category, searchTerm) {
        if (!productData[category]) return;
        
        productCards.innerHTML = '';
        let resultsFound = false;
        
        productData[category].forEach(product => {
            // Filter items that match the search term
            const matchedItems = product.items.filter(item => 
                item.toLowerCase().includes(searchTerm)
            );
            
            // If we have matching items, create a card for this subcategory
            if (matchedItems.length > 0) {
                resultsFound = true;
                
                const card = document.createElement('div');
                card.className = 'product-card';
                
                const cardHeader = document.createElement('div');
                cardHeader.className = 'product-card-header';
                cardHeader.innerHTML = `<h3>${product.title}</h3>`;
                
                const cardBody = document.createElement('div');
                cardBody.className = 'product-card-body';
                
                const itemsList = document.createElement('ul');
                itemsList.className = 'product-items';
                
                matchedItems.forEach(item => {
                    const listItem = document.createElement('li');
                    // Highlight the matching text
                    const itemText = item;
                    const highlightedText = itemText.replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);
                    listItem.innerHTML = highlightedText;
                    itemsList.appendChild(listItem);
                });
                
                cardBody.appendChild(itemsList);
                
                // Add See More button if items are more than 10
                if (matchedItems.length > 10) {
                    const seeMoreBtn = document.createElement('div');
                    seeMoreBtn.className = 'see-more-btn';
                    seeMoreBtn.textContent = 'See More';
                    
                    seeMoreBtn.addEventListener('click', function() {
                        if (card.classList.contains('expanded')) {
                            card.classList.remove('expanded');
                            seeMoreBtn.textContent = 'See More';
                        } else {
                            card.classList.add('expanded');
                            seeMoreBtn.textContent = 'See Less';
                        }
                    });
                    
                    cardBody.appendChild(seeMoreBtn);
                }
                
                card.appendChild(cardHeader);
                card.appendChild(cardBody);
                productCards.appendChild(card);
            }
        });
        
        // If no results found
        if (!resultsFound) {
            productCards.innerHTML = '<div class="no-results">No products found matching your search.</div>';
        }
    }
    
    // Function to search across all categories
    function filterProductsBySearchAllCategories(searchTerm) {
        productCards.innerHTML = '';
        let resultsFound = false;
        
        // Create a container for category headers
        const categoryResults = {};
        
        // Search through all categories
        Object.keys(productData).forEach(category => {
            productData[category].forEach(product => {
                // Filter items that match the search term
                const matchedItems = product.items.filter(item => 
                    item.toLowerCase().includes(searchTerm)
                );
                
                // If we have matching items, add them to the results
                if (matchedItems.length > 0) {
                    resultsFound = true;
                    
                    // Create category header if it doesn't exist
                    if (!categoryResults[category]) {
                        categoryResults[category] = [];
                    }
                    
                    // Add this product to the category results
                    categoryResults[category].push({
                        title: product.title,
                        items: matchedItems
                    });
                }
            });
        });
        
        // Display results by category
        if (resultsFound) {
            // Get the category names in a specific order (matching the sidebar)
            const orderedCategories = ['animal', 'pharmaceuticals', 'nutraceuticals', 'plant-extracts', 'new-products'];
            
            // Create a category label function
            const getCategoryLabel = (category) => {
                const labels = {
                    'animal': 'Animal',
                    'pharmaceuticals': 'Pharmaceuticals',
                    'nutraceuticals': 'Nutraceuticals',
                    'plant-extracts': 'Plant Extracts',
                    'new-products': 'New Products'
                };
                return labels[category] || category.charAt(0).toUpperCase() + category.slice(1);
            };
            
            // Display results in the ordered category sequence
            orderedCategories.forEach(category => {
                if (categoryResults[category] && categoryResults[category].length > 0) {
                    // Add category header
                    const categoryHeader = document.createElement('div');
                    categoryHeader.className = 'search-category-header';
                    categoryHeader.innerHTML = `<h2>${getCategoryLabel(category)}</h2>`;
                    productCards.appendChild(categoryHeader);
                    
                    // Add products in this category
                    categoryResults[category].forEach(product => {
                        const card = document.createElement('div');
                        card.className = 'product-card';
                        
                        const cardHeader = document.createElement('div');
                        cardHeader.className = 'product-card-header';
                        cardHeader.innerHTML = `<h3>${product.title}</h3>`;
                        
                        const cardBody = document.createElement('div');
                        cardBody.className = 'product-card-body';
                        
                        const itemsList = document.createElement('ul');
                        itemsList.className = 'product-items';
                        
                        product.items.forEach(item => {
                            const listItem = document.createElement('li');
                            // Highlight the matching text
                            const highlightedText = item.replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);
                            listItem.innerHTML = highlightedText;
                            itemsList.appendChild(listItem);
                        });
                        
                        cardBody.appendChild(itemsList);
                        
                        // Add See More button if items are more than 10
                        if (product.items.length > 10) {
                            const seeMoreBtn = document.createElement('div');
                            seeMoreBtn.className = 'see-more-btn';
                            seeMoreBtn.textContent = 'See More';
                            
                            seeMoreBtn.addEventListener('click', function() {
                                if (card.classList.contains('expanded')) {
                                    card.classList.remove('expanded');
                                    seeMoreBtn.textContent = 'See More';
                                } else {
                                    card.classList.add('expanded');
                                    seeMoreBtn.textContent = 'See Less';
                                }
                            });
                            
                            cardBody.appendChild(seeMoreBtn);
                        }
                        
                        card.appendChild(cardHeader);
                        card.appendChild(cardBody);
                        productCards.appendChild(card);
                    });
                }
            });
        } else {
            // If no results found
            productCards.innerHTML = '<div class="no-results">No products found matching your search.</div>';
        }
    }
    
    // Set active category and load products
    function setActiveCategory(category) {
        categoryItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.category === category) {
                item.classList.add('active');
            }
        });
        
        createProductCards(category);
    }
    
    // Add click event to category items
    if (categoryItems.length > 0 && productCards) {
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                const category = this.dataset.category;
                setActiveCategory(category);
            });
        });
        
        // Load default category (animal)
        setActiveCategory('animal');
    }
    
    // Handle category links in footer
    document.querySelectorAll('.footer-links a[data-category]').forEach(link => {
        link.addEventListener('click', function(e) {
            const category = this.dataset.category;
            if (category) {
                setActiveCategory(category);
            }
        });
    });
});