



		$(document).ready(function(){

      function Element(element_symbol_text,atomic_number,atomic_weight,element_description){
        this.element_symbol_text = element_symbol_text;
        this.atomic_number = atomic_number;
        this.atomic_weight = atomic_weight;
        this.element_description = element_description;
      }
		
			var setElementInformation = function(container, element_symbol_text,atomic_number,atomic_weight,element_description){
				container.find('.element-symbol-modal').text(element_symbol_text);
  				container.find('.atomic-number-modal').text(atomic_number);
  				container.find('.atomic-weight-modal').text(atomic_weight);
  				container.find('.element-description-modal').text(element_description);
			}

      var getElement = function(atomic_number){

          switch(atomic_number){
            case 1:
              return new Element(
                "H",
                "1",
                "1.007",
                "With a standard atomic weight of 1.008, \
                hydrogen is the lightest element on the periodic table. Its monatomic form (H) is the most abundant chemical substance in the Universe,\
                 constituting roughly 75% of all baryonic mass.[7][note 1] Non-remnant stars are mainly composed of hydrogen in the plasma state. \
                The most common isotope of hydrogen, termed protium (name rarely used, symbol 1H), has one proton and no neutrons. (Source: Wikipedia)");
            case 2:
              return new Element(
                "He",
                "2",
                "4.0026","It is a colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas group in the periodic table. Its boiling point is the lowest among all the elements.\
                  After hydrogen, helium is the second lightest and second most abundant element in the observable universe,\
                   being present at about 24% of the total elemental mass, which is more than 12 times the mass of all the heavier elements combined.\
                    Its abundance is similar to this figure in the Sun and in Jupiter. (Source: Wikipedia)");
            case 3:
              return new Element(
                "Li",
                "3",
                "6.94","It is a soft, silvery-white alkali metal. Under standard conditions, \
                it is the lightest metal and the lightest solid element. Like all alkali metals, lithium is highly reactive and flammable, \
                and is stored in mineral oil. When cut open, it exhibits a metallic luster, but moist air corrodes it quickly to a dull silvery gray, \
                then black tarnish. It never occurs freely in nature, but only in (usually ionic) compounds, such as pegmatitic minerals \
                which were once the main source of lithium. Due to its solubility as an ion, it is present in ocean water and is commonly obtained from brines. \
                Lithium metal is isolated electrolytically from a mixture of lithium chloride and potassium chloride. (Source: Wikipedia)");
            case 4:
              return new Element(
                "Be",
                "4",
                "9.0121"," It is a relatively rare element in the universe, usually occurring as a product of the spallation of larger atomic nuclei \
                that have collided with cosmic rays. Within the cores of stars beryllium is depleted as it is fused and creates larger elements. \
                It is a divalent element which occurs naturally only in combination with other elements in minerals. Notable gemstones \
                which contain beryllium include beryl (aquamarine, emerald) and chrysoberyl. \
                As a free element it is a steel-gray, strong, lightweight and brittle alkaline earth metal. (Source: Wikipedia)");
            case 5:
              return new Element(
                "B",
                "5",
                "10.81",
                "Produced entirely by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, \
                it is a low-abundance element in the Solar system and in the Earth's crust.[11] \
                Boron is concentrated on Earth by the water-solubility of its more common naturally occurring compounds, \
                the borate minerals. These are mined industrially as evaporites, such as borax and kernite. The largest known \
                boron deposits are in Turkey, the largest producer of boron minerals. (Source: Wikipedia)");
            case 6:
              return new Element("C",
                "6",
                "12.011",
                "It is nonmetallic and tetravalent—making four electrons available to form covalent chemical bonds. \
                It belongs to group 14 of the periodic table.[13] Three isotopes occur naturally, 12C and 13C being stable, while 14C is a radionuclide, \
                decaying with a half-life of about 5,730 years.[14] Carbon is one of the few elements known since antiquity.[15] (Source: Wikipedia)");
            case 7:
              return new Element(
                "N",
                "7",
                "14.007",
                "It was first discovered and isolated by Scottish physician Daniel Rutherford in 1772. \
                Although Carl Wilhelm Scheele and Henry Cavendish had independently done so at about the same time, \
                Rutherford is generally accorded the credit because his work was published first. \
                 The name nitrogène was suggested by French chemist Jean-Antoine-Claude Chaptal in 1790, when it was found that nitrogen was \
                 present in nitric acid and nitrates. Antoine Lavoisier suggested instead the name azote, from the Greek άζωτικός \"no life\", \
                 as it is an asphyxiant gas; this name is instead used in many languages, such as French, Russian, and Turkish, \
                and appears in the English names of some nitrogen compounds such as hydrazine, azides and azo compounds.(Source: Wikipedia)");
            case 8:
              return new Element("O",
                "8",
                "15.999",
                " It is a member of the chalcogen group on the periodic table, a highly reactive nonmetal, \
               and an oxidizing agent that readily forms oxides with most elements as well as with other compounds. By mass, oxygen is the third-most abundant element in the universe, after hydrogen and helium. At standard temperature and pressure, \
                two atoms of the element bind to form dioxygen, a colorless and odorless diatomic gas with the formula O2. \
                Diatomic oxygen gas constitutes 20.8% of the Earth's atmosphere. As compounds including oxides,\
                 the element makes up almost half of the Earth's crust. (Source: Wikipedia)");
            case 9:
              return new Element("F","9","18.998","It is the lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard conditions.\
               As the most electronegative element, \
                it is extremely reactive: almost all other elements, including some noble gases, form compounds with fluorine. (Source: Wikipedia)");
            case 10:
              return new Element("Ne",
                "10",
                "20.1797",
                " Neon is a colorless, odorless, inert monatomic gas under standard conditions, \
                with about two-thirds the density of air. It was discovered (along with krypton and xenon) in 1898 as one of the three residual \
                rare inert elements remaining in dry air, after nitrogen, oxygen, argon and carbon dioxide were removed. Neon was the second of \
                these three rare gases to be discovered and was immediately recognized as a new element from its bright red emission spectrum. \
                The name neon is derived from the Greek word, νέον, neuter singular form of νέος (neos), meaning new. Neon is chemically inert, \
                and no uncharged neon compounds are known. \
                The compounds of neon currently known include ionic molecules, molecules held together by van der Waals forces and clathrates.(Source: Wikipedia)");
            case 11:
              return new Element("Na","11","22.989","It is a soft, silvery-white, highly reactive metal.\
               Sodium is an alkali metal, being in group 1 of the periodic table, because it has a single electron \
                in its outer shell that it readily donates, creating a positively charged ion—the Na+ cation.\
                 Its only stable isotope is 23Na. The free metal does not occur in nature, but must be prepared from compounds.\
                  Sodium is the sixth most abundant element in the Earth's crust, and exists in numerous minerals such as feldspars,\
                   sodalite, and rock salt (NaCl). Many salts of sodium are highly water-soluble: sodium ions have been leached by the \
                   action of water from the Earth's minerals over eons,\
               and thus sodium and chlorine are the most common dissolved elements by weight in the oceans.(Source: Wikipedia)");
            case 12:
              return new Element(
                "Mg",
                "12",
                "24.305",
                "It is a shiny gray solid which bears a close physical \
                resemblance to the other five elements in the second column (group 2, or alkaline earth metals)\
                 of the periodic table: all group 2 elements \
                have the same electron configuration in the outer electron shell and a similar crystal structure. (Source: Wikipedia)");
            case 13:
              return new Element(
                "Al",
                "13","26.981",
                "It is a silvery-white, soft, nonmagnetic and ductile metal in the boron group.\
               By mass, aluminium makes up about 8% of the Earth's crust; it is the third most abundant element after oxygen and \
               silicon and the most abundant metal in the crust, though it is less common in the mantle below. \
               The chief ore of aluminium is bauxite. Aluminium metal is so chemically reactive that native specimens are rare and limited \
                to extreme reducing environments. Instead, it is found combined in over 270 different minerals.[5] (Source: Wikipedia)");
            case 14:
              return new Element("Si",
                "14",
                "28.085",
                "It is a hard and brittle crystalline solid with a blue-grey metallic lustre;\
               and it is a tetravalent metalloid and semiconductor. It is a member of group 14 in the periodic table: carbon is above it;\
                and germanium, tin, and lead are below it. It is relatively unreactive. Because of its large chemical affinity for oxygen,\
                 it was not until 1823 that Jöns Jakob Berzelius was first able to prepare it and characterize it in pure form. \
                 Its melting and boiling points of 1414 °C and 3265 °C respectively are the second-highest among all the metalloids and nonmetals,\
                  being only surpassed by boron. Silicon is the eighth most common element in the universe by mass, but very rarely occurs\
                   as the pure element in the Earth's crust. It is most widely distributed in dusts, sands, planetoids, and planets as various\
                    forms of silicon dioxide (silica) or silicates. Over 90% of the Earth's crust is composed of silicate minerals, \
                making silicon the second most abundant element in the Earth's crust (about 28% by mass) after oxygen. (Source: Wikipedia)");
            case 15:
              return new Element("P",
                "15",
                "30.973",
                "Elemental phosphorus exists in two major forms, \
                white phosphorus and red phosphorus, but because it is highly reactive, phosphorus is never found as a free element on Earth. \
                It has a concentration in the Earth's crust of about one gram per kilogram (compare copper at about 0.06 grams). With few exceptions,\
                 minerals containing phosphorus are in the maximally oxidized state as inorganic phosphate rocks. (Source: Wikipedia)");
            case 16:
              return new Element(
                "S",
                "16",
                "32.06",
                "It is abundant, multivalent, and nonmetallic. Under normal conditions, sulfur atoms form cyclic octatomic molecules with a chemical formula S8.\
                 Elemental sulfur is a bright yellow crystalline solid at room temperature. \
                Chemically, sulfur reacts with all elements except for gold, platinum, iridium, tellurium, and the noble gases. (Source: Wikipedia)");
            case 17:
              return new Element(
                "Cl",
                "17",
                "35.45",
                "The second-lightest of the halogens, it appears between fluorine and bromine in the periodic table and its properties\
                 are mostly intermediate between them. Chlorine is a yellow-green gas at room temperature. It is an extremely reactive element and\
                  a strong oxidising agent: among the elements,\
                 it has the highest electron affinity and the third-highest electronegativity, behind only oxygen and fluorine.(Source: Wikipedia)");
            case 18:
              return new Element("Ar",
                "18",
                "39.948",
                "It is in group 18 of the periodic table and is a noble gas.[6] \
                Argon is the third-most abundant gas in the Earth's atmosphere, at 0.934% (9340 ppmv). \
                It is more than twice as abundant as water vapor (which averages about 4000 ppmv, but varies greatly), \
                23 times as abundant as carbon dioxide (400 ppmv), and more than 500 times as abundant as neon (18 ppmv).\
               Argon is the most abundant noble gas in Earth's crust, comprising 0.00015% of the crust. (Source: Wikipedia)");
            case 19:
              return new Element(
                "K",
                "19",
                "39.0983","It was first isolated from potash, the ashes of plants, from which its name derives. \
                In the periodic table, potassium is one of the alkali metals. All of the alkali metals have a single valence electron in the outer electron shell,\
                 which is easily removed to create an ion with a positive charge – a cation, which combines with anions to form salts. Potassium in nature occurs\
                  only in ionic salts. Elemental potassium is a soft silvery-white alkali metal that oxidizes rapidly in air and reacts vigorously with water,\
                   generating sufficient heat to ignite hydrogen emitted in the reaction, and burning with a lilac-colored flame. \
                It is found dissolved in sea water (which is 0.04% potassium by weight[5][6]), and is part of many minerals. (Source: Wikipedia)");
            case 20:
              return new Element(
                "Ca",
                "20",
                "40.078",
                "An alkaline earth metal, calcium is a reactive metal that forms a dark oxide-nitride layer when exposed to air.\
               Its physical and chemical properties are most similar to its heavier homologues strontium and barium. \
               It is the fifth most abundant element in Earth's crust and the third most abundant metal, after iron and aluminium. \
               The most common calcium compound on Earth is calcium carbonate, found in limestone and the fossilised remnants of early sea life;\
                gypsum, anhydrite, fluorite, and apatite are also sources of calcium. The name derives from Latin calx \"lime\",\
               which was obtained from heating limestone.(Source: Wikipedia)");
            case 21:
              return new Element(
                "Sc",
                "21",
                "44.955",
                "A silvery-white metallic d-block element, \
                it has historically been classified as a rare-earth element,[5] together with yttrium and the lanthanides. \
                It was discovered in 1879 by spectral analysis of the minerals euxenite and gadolinite from Scandinavia.(Source: Wikipedia)");
            case 22:
              return new Element(
                "Ti",
                "22",
                "47.871",
                " It is a lustrous transition metal with a silver color, low density, and high strength. Titanium is resistant to corrosion in sea water, aqua regia, and chlorine.\
                Titanium was discovered in Cornwall, Great Britain, by William Gregor in 1791, and was named by Martin Heinrich Klaproth after the Titans of Greek mythology. \
                The element occurs within a number of mineral deposits, principally rutile and ilmenite, which are widely distributed in the Earth's crust and \
                lithosphere, and it is found in almost all living things, water bodies, rocks, and soils.[5] (Source: Wikipedia) ");
            case 23:
              return new Element(
                "V",
                "23",
                "50.9415",
                " It is a hard, silvery-grey, ductile, and malleable transition metal. The elemental metal is rarely found in nature, but once isolated artificially, the formation of an oxide layer (passivation) somewhat stabilizes the free metal against further oxidation.\
                    Andrés Manuel del Río discovered compounds of vanadium in 1801 in Mexico by analyzing a new lead-bearing mineral he called\
                     \"brown lead\", and presumed its qualities were due to the presence of a new element, which he named erythronium \
                     (derived from Greek for \"red\") since, upon heating, most of the salts turned red. Four years later, however, he was \
                     (erroneously) convinced by other scientists that erythronium was identical to chromium. (Source: Wikipedia)");
            case 24:
              return new Element(
                "Cr",
                "25",
                "51.996",
                "It is the first element in group 6. It is a steely-grey, lustrous, hard and brittle metal[4] which takes a high polish, \
                resists tarnishing, and has a high melting point. The name of the element is derived from the Greek word χρῶμα, chrōma, meaning color,[5] \
                because many chromium compounds are intensely colored. (Source: Wikipedia)");
            case 25:
              return new Element(
                "Mn",
                "26",
                "54.938",
                "It is not found as a free element in nature; it is often found in minerals in combination with iron. Manganese is a metal with important industrial metal alloy uses, particularly in stainless steels.  \
                Historically, manganese is named for pyrolusite and other black minerals from the region of Magnesia in Greece, \
                which also gave its name to magnesium and the iron ore magnetite. By the mid-18th century, \
                Swedish-German chemist Carl Wilhelm Scheele had used pyrolusite to produce chlorine. Scheele and others were aware that pyrolusite \
                (now known to be manganese dioxide) contained a new element, but they were unable to isolate it. Johan Gottlieb Gahn was the first to \
                isolate an impure sample of manganese metal in 1774, which he did by reducing the dioxide with carbon.(Source: Wikipedia)");
            case 26:
              return new Element(
                "Fe",
                "26",
                "55.845",
                "It is a metal in the first transition series. It is by mass the most common element on Earth, \
                forming much of Earth's outer and inner core. It is the fourth most common element in the Earth's crust. \
                Its abundance in rocky planets like Earth is due to its abundant production by fusion in high-mass stars, where it is the last element to be \
                produced with release of energy before the violent collapse of a supernova, which scatters the iron into space. (Source: Wikipedia)");
            case 27:
              return new Element(
                "Co",
                "27",
                "58.933",
                " Like nickel, cobalt is found in the Earth's crust only in chemically combined form, \
                save for small deposits found in alloys of natural meteoric iron. \
                The free element, produced by reductive smelting, is a hard, lustrous, silver-gray metal. (Source: Wikipedia)");
            case 28:
              return new Element(
                "Ni",
                "28",
                "58.6934",
                "Nickel is a silvery-white lustrous metal with a slight golden tinge.\
               Nickel belongs to the transition metals and is hard and ductile. Pure nickel, powdered to maximize the reactive surface area, \
               shows a significant chemical activity, but larger pieces are slow to react with air under standard conditions because an oxide layer forms\
                on the surface and prevents further corrosion (passivation). Even so, pure native nickel is found in Earth's crust only in tiny amounts,\
                 usually in ultramafic rocks,[4][5] and in the interiors of\
               larger nickel–iron meteorites that were not exposed to oxygen when outside Earth's atmosphere.(Source: Wikipedia)");
            case 29:
              return new Element("Cu","29","63.546","Copper is a soft, malleable, and ductile metal with very high thermal and electrical conductivity.\
               A freshly exposed surface of pure copper has a reddish-orange color. Copper is used as a conductor of heat and electricity, as a building material,\
                and as a constituent of various metal alloys, such as sterling silver used in jewelry, cupronickel used to make marine hardware and coins, \
                and constantan used in strain gauges and thermocouples for temperature measurement.");
            case 30:
              return new Element("Zn","30","65.382","It is the first element in group 12 of the periodic table.\
               In some respects zinc is chemically similar to magnesium: both elements exhibit only one normal oxidation state (+2),\
                and the Zn2+ and Mg2+ ions are of similar size. Zinc is the 24th most abundant element in Earth's crust and has five stable isotopes.\
                 The most common zinc ore is sphalerite (zinc blende), a zinc sulfide mineral. The largest workable lodes are in Australia, Asia,\
                  and the United States.\
               Zinc is refined by froth flotation of the ore, roasting, and final extraction using electricity (electrowinning). (Source: Wikipedia)");
            case 31:
              return new Element("Ga","31","69.7231","It is in group 13 of the periodic table, and thus has similarities to the other metals of the group,\
               aluminium, indium, and thallium. Gallium does not occur as a free element in nature, but as gallium(III) compounds in trace amounts in zinc ores \
               and in bauxite.[5] Elemental gallium is a soft, silvery blue metal at standard temperature and pressure, a brittle solid at low temperatures,\
                and a liquid at temperatures greater than 29.76 °C (85.57 °F)\
               (above room temperature, but below the normal human body temperature). (Source: Wikipedia)");
            case 32:
              return new Element(
                "Ge",
                "32",
                "72.630",
                "It is a lustrous, hard, grayish-white metalloid in the carbon group,\
               chemically similar to its group neighbors tin and silicon. Pure germanium is a semiconductor with an appearance similar to elemental silicon.\
               Like silicon, germanium naturally reacts and forms complexes with oxygen in nature. (Source: Wikipedia)");
            case 33:
              return new Element(
                "As",
                "33",
                "74.921595",
                "Arsenic occurs in many minerals,\
               usually in combination with sulfur and metals, but also as a pure elemental crystal. Arsenic is a metalloid. It has various allotropes,\
               but only the gray form, which has a metallic appearance, is important to industry. (Source: Wikipedia)");
            case 34:
              return new Element(
                "Se",
                "34",
                "78.971",
                "Selenium is a nonmetal with properties that are intermediate between\
               the elements above and below in the periodic table, sulfur and tellurium, and also has similarities to arsenic.\
                It rarely occurs in its elemental state or as pure ore compounds in the Earth's crust. Selenium (from Ancient Greek σελήνη (selḗnē) \"Moon\")\
                 was discovered in 1817 by Jöns Jacob Berzelius, \
                who noted the similarity of the new element to the previously discovered tellurium (named for the Earth) (Source: Wikipedia).");
            case 35:
              return new Element(
                "Br",
                "35",
                "79.904",
                "Bromine is the third-lightest halogen, and is a fuming red-brown liquid at room temperature that evaporates readily to form a similarly coloured gas. Its properties are thus intermediate between those of chlorine and iodine. Isolated independently by two chemists, Carl Jacob Löwig (in 1825) and Antoine Jérôme Balard (in 1826), \
                its name was derived from the Ancient Greek βρῶμος (\"stench\"), referencing its sharp and disagreeable smell.(Source: Wikipedia)");
            case 36:
              return new Element(
                "Kr",
                "36","83.798"," It is a member of group 18 (noble gases) elements. A colorless, odorless, tasteless noble gas, krypton occurs in trace amounts in the atmosphere and is often used with other rare gases in fluorescent lamps. With rare exceptions, krypton is chemically inert.  \
                Krypton, like the other noble gases, is used in lighting and photography. Krypton light has many spectral lines, \
                and krypton plasma is useful in bright, high-powered gas lasers (krypton ion and excimer lasers), \
                each of which resonates and amplifies a single spectral line.");
            case 37:
              return new Element("Rb","37","85.4678","Rubidium is a soft, silvery-white metallic element of the alkali metal group, \
                with a standard atomic weight of 85.4678. Elemental rubidium is highly reactive, with properties similar to those of other alkali metals,\
                 including rapid oxidation in air. On Earth, natural rubidium comprises two isotopes: 72% is the stable isotope, 85Rb; 28% is the slightly\
                  radioactive 87Rb, with a half-life of 49 billion years—more than three times longer than the estimated age of the universe.  \
                German chemists Robert Bunsen and Gustav Kirchhoff discovered rubidium in 1861 by the newly developed technique, flame spectroscopy. (Source: Wikipedia)");
            case 38:
              return new Element("Sr","38","87.621","An alkaline earth metal, strontium is a soft silver-white yellowish metallic element\
               that is highly reactive chemically. The metal forms a dark oxide layer when it is exposed to air.\
                Strontium has physical and chemical properties similar to those of its two vertical neighbors in the periodic table,\
                 calcium and barium. It occurs naturally mainly in the minerals celestine and strontianite, and is mostly mined from these.\
                  While natural strontium is stable, the synthetic 90Sr isotope is radioactive and is one of the most dangerous components of nuclear fallout,\
                   as strontium is absorbed by the body in a similar manner to calcium. \
                Natural stable strontium, on the other hand, is not hazardous to health. (Source: Wikipedia)");
            case 39:
              return new Element("Y","39","88.905","It is a silvery-metallic transition metal chemically similar to the\
                lanthanides and has often been classified as a \"rare-earth element\".[4] Yttrium is almost always found in combination \
                with lanthanide elements in rare-earth minerals, and is never found in nature as a free element. \
                89Y is the only stable isotope, and the only isotope found in the Earth's crust.");
            case 40:
              return new Element("Zr","40","91.224"," The name zirconium is taken from the name of the mineral zircon,\
               the most important source of zirconium. The word zircon comes from the Persian word zargun زرگون, meaning \"gold-colored\".[5] \
               It is a lustrous, grey-white, strong transition metal that closely resembles hafnium and, to a lesser extent, titanium. \
               Zirconium is mainly used as a refractory and opacifier, although small amounts are used as an alloying agent for its strong\
                resistance to corrosion. Zirconium forms a variety of inorganic and organometallic compounds such as zirconium dioxide and zirconocene dichloride,\
                 respectively. Five isotopes occur naturally,\
               three of which are stable. Zirconium compounds have no known biological role. (Source: Wikipedia)");
            case 41:
              return new Element("Nb","41","92.906","It is a soft, grey, crystalline, ductile transition metal,\
               often found in the minerals pyrochlore and columbite, hence the former name \"columbium\".\
                Its name comes from Greek mythology, specifically Niobe, who was the daughter of Tantalus, the namesake of tantalum.\
                 The name reflects the great similarity between the two elements in their physical and chemical properties,\
               making them difficult to distinguish.[2] (Source: Wikipedia)");
            case 42:
              return new Element("Mo","42","95.95","The name is from Neo-Latin molybdaenum, from Ancient Greek Μόλυβδος molybdos,\
               meaning lead, since its ores were confused with lead ores.[6] Molybdenum minerals have been known throughout history,\
                but the element was discovered (in the sense of differentiating it as a new entity from the mineral salts of other metals)\
                 in 1778 by Carl Wilhelm Scheele.\
               The metal was first isolated in 1781 by Peter Jacob Hjelm. [7]");
            case 43:
              return new Element("Tc","43","98"," It is the lightest element whose isotopes are all radioactive; none are stable,\
               excluding the fully ionized state of 97Tc.[4] Nearly all technetium is produced synthetically,\
                and only about 18000 tons can be found at any given time in the Earth's crust. Naturally occurring technetium is a spontaneous fission product\
                 in uranium ore and thorium ore, the most common source, or the product of neutron capture in molybdenum ores.\
                  The chemical properties of this silvery gray, crystalline transition metal are intermediate between rhenium and manganese,\
                   which it lies between in group 7 of the periodic table.\
               The most common naturally occurring isotope is 99Tc. (Source: Wikipedia)");
            case 44:
              return new Element("Ru","44","101.07","It is a rare transition metal belonging to the platinum group of the periodic table. \
                Like the other metals of the platinum group, ruthenium is inert to most other chemicals. The Russian-born scientist of Baltic-German ancestry\
                 and a member of the Russian Academy of Science Karl Ernst Claus discovered the element in 1844 at Kazan State University in Russia and\
                  named it after the Latin name of his homeland, Ruthenia. Ruthenium is usually found as a minor component of platinum ores; the annual\
                   production is about 20 tonnes.[5] Most ruthenium produced is used in wear-resistant electrical contacts and thick-film resistors. \
                   A minor application for ruthenium is in platinum alloys and as a chemistry catalyst. \
                   A new application of ruthenium is as the capping layer for extreme ultraviolet photomasks.\
                    Ruthenium is generally found in ores with the other platinum group metals in the Ural Mountains and in North and South America.\
                     Small but commercially important quantities are also found in pentlandite extracted from Sudbury, \
                Ontario and in pyroxenite deposits in South Africa.[6] (Source: Wikipedia)");
            case 45:
              return new Element(
                "Rh",
                "45",
                "186.207",
                "It is a silvery-gray, heavy, third-row transition metal in group 7 of the periodic table. \
                With an estimated average concentration of 1 part per billion (ppb), rhenium is one of the rarest elements in the Earth's crust. \
                Rhenium has the third-highest melting point and second-highest boiling point of any element at 5903 K. Rhenium resembles manganese \
                and technetium chemically and is mainly obtained as a by-product of the extraction and refinement of molybdenum and copper ores. \
                Rhenium shows in its compounds a wide variety of oxidation states ranging from −1 to +7.(Source: Wikipedia)");
            case 46:
              return new Element(
                "Pd",
                "46",
                "106.42",
                " It is a rare and lustrous silvery-white metal discovered in 1803 by William Hyde Wollaston.\
               He named it after the asteroid Pallas, which was itself named after the epithet of the Greek goddess Athena, acquired by her when she slew Pallas.\
                Palladium, platinum, rhodium, ruthenium, iridium and osmium form a group of elements referred to as the platinum group metals (PGMs).\
                 These have similar chemical properties,\
               but palladium has the lowest melting point and is the least dense of them. (Source: Wikipedia)");
            case 47:
              return new Element(
                "Ag",
                "47",
                "107.868",
                "A soft, white, lustrous transition metal, it exhibits the highest electrical conductivity,\
                 thermal conductivity, and reflectivity of any metal. The metal is found in the Earth's crust in the pure,\
                  free elemental form (\"native silver\"), as an alloy with gold and other metals, and in minerals such as argentite and chlorargyrite. \
                Most silver is produced as a byproduct of copper, gold, lead, and zinc refining.");
            case 48:
              return new Element(
                "Cd",
                "48",
                "112.414",
                "This soft, bluish-white metal is chemically similar to the two other stable metals in group 12, namely zinc and mercury. \
                Like zinc, it demonstrates oxidation state +2 in most of its compounds, and like mercury, it has a lower melting point than the\
                 transition metals in groups 3 through 11. Cadmium and its congeners in group 12 are often not considered transition metals,\
                  in that they do not have partly filled d or f electron shells in the elemental or common oxidation states.\
                   The average concentration of cadmium in Earth's crust is between 0.1 and 0.5 parts per million (ppm).\
                    It was discovered in 1817 simultaneously by Stromeyer and Hermann,\
               both in Germany, as an impurity in zinc carbonate. (Source: Wikipedia)");
            case 49:
              return new Element("In","49","114.818","Indium is a post-transition metal that makes up 0.21 parts per million of the Earth's crust. \
                Very soft and malleable, indium has a melting point higher than sodium and gallium, but lower than lithium and tin. Chemically, \
                indium is similar to gallium and thallium, and it is largely intermediate between the two in terms of its properties.[6] \
                Indium was discovered in 1863 by Ferdinand Reich and Hieronymous Theodor Richter by spectroscopic methods. \
                They named it for the indigo blue line in its spectrum. Indium was isolated the next year. (Source: Wikipedia)");
            case 50:
              return new Element("Sn","50","118.710","It is a post-transition metal in group 14 of the periodic table. \
                It is obtained chiefly from the mineral cassiterite, which contains stannic oxide, SnO2. \
                Tin shows a chemical similarity to both of its neighbors in group 14, germanium and lead, and has two main oxidation states, \
                +2 and the slightly more stable +4. Tin is the 49th most abundant element and has, with 10 stable isotopes, the largest number\
                 of stable isotopes in the periodic table, thanks to its magic number of protons. It has two main allotropes: at room temperature,\
                  the stable allotrope is β-tin, a silvery-white, malleable metal, but at low temperatures it transforms into the less dense grey α-tin,\
                which has the diamond cubic structure. Metallic tin does not easily oxidize in air.");
            case 51:
              return new Element("Sn","51","121.760","A lustrous gray metalloid, it is found in nature mainly as the sulfide mineral stibnite (Sb2S3).\
               Antimony compounds have been known since ancient times and were powdered for use as medicine and cosmetics, often known by the Arabic name,\
                kohl.[4] Metallic antimony was also known, but it was erroneously identified as lead upon its discovery. \
                The earliest known description of the metal in the West was written in 1540 by Vannoccio Biringuccio. (Source: Wikipedia)");
            case 52:
              return new Element(
                "Te",
                "52",
                "127.603",
                "It is a brittle, mildly toxic, rare, silver-white metalloid.\
               Tellurium is chemically related to selenium and sulfur. It is occasionally found in native form as elemental crystals.\
                Tellurium is far more common in the universe as a whole than on Earth. Its extreme rarity in the Earth's crust, comparable to that of platinum,\
                 is due partly to its high atomic number, but also to its formation of a volatile \
                hydride which caused it to be lost to space as a gas during the hot nebular formation of the planet.");
            case 53:
              return new Element(
                "I",
                "53",
                "126.904",
                "The heaviest of the stable halogens, it exists as a lustrous, \
                purple-black metallic solid at standard conditions that sublimes readily to form a violet gas. \
                The elemental form was discovered by the French chemist Bernard Courtois in 1811. \
                It was named two years later by Joseph-Louis Gay-Lussac from this property, after the Greek ἰώδης \"violet-coloured\".");
            case 54:
              return new Element(
                "Xe",
                "54",
                "131.293",
                "It is a colorless, dense, odorless noble gas found in the Earth's atmosphere in trace amounts.[10] Although generally unreactive, xenon can undergo a few chemical reactions such as the formation of xenon hexafluoroplatinate, the first noble gas \
                compound to be synthesized.[11][12][13]\ 
                Xenon is used in flash lamps[14] and arc lamps,\
                [15] and as a general anesthetic.[16] The first excimer laser design used a xenon dimer molecule (Xe2)\
                 as the lasing medium,[17] and the earliest laser designs used xenon flash lamps as pumps.[18] Xenon is used to search\
                  for hypothetical weakly interacting massive particles[19] and as the propellant for ion thrusters in spacecraft.[20] (Source: Wikipedia)");
            case 55:
              return new Element("Cs","55","132.905","It is a soft, silvery-gold alkali metal with a melting point of 28.5 °C (83.3 °F),\
               which makes it one of only five elemental metals that are liquid at or near room temperature.[note 2] Caesium has physical\
                and chemical properties similar to those of rubidium and potassium. The most reactive of all metals, \
                it is pyrophoric and reacts with water even at −116 °C (−177 °F). It is the least electronegative element,\
                 with a value of 0.79 on the Pauling scale. It has only one stable isotope, caesium-133. Caesium is mined mostly from pollucite,\
                  while the radioisotopes, especially caesium-137,\
               a fission product, are extracted from waste produced by nuclear reactors.(Source: Wikipedia)");
            case 56:
              return new Element("Ba","56","137.327","Because of its high chemical reactivity, barium is never found in nature as a free element. Its hydroxide, known in pre-modern times as baryta, does not occur as a mineral, but can be prepared by heating barium carbonate.  \
                    The most common naturally occurring minerals of barium are barite (barium sulfate, BaSO4) and witherite (barium carbonate, BaCO3), \
                    both insoluble in water. The name barium originates from the alchemical derivative \"baryta\", from Greek βαρύς (barys), meaning \"heavy.\" \
                    Baric is the adjectival form of barium. Barium was identified as a new element in 1774, but not reduced to a metal until 1808 with the \
                    advent of electrolysis.");
            case 57:
              return new Element("No Data Available","57","No Data Available","Hafnium");
            case 58:
              return new Element("No Data Available","58","No Data Available","No Data Available");
            case 59:
              return new Element("No Data Available","59","No Data Available","No Data Available");
            case 60:
              return new Element("No Data Available","60","No Data Available","No Data Available");
            case 61:
              return new Element("No Data Available","61","No Data Available","No Data Available");
            case 62:
              return new Element("No Data Available","62","No Data Available","No Data Available");
            case 63:
              return new Element("No Data Available","63","No Data Available","No Data Available");
            case 64:
              return new Element("No Data Available","64","No Data Available","No Data Available");
            case 65:
              return new Element("No Data Available","65","No Data Available","No Data Available");
            case 66:
              return new Element("No Data Available","66","No Data Available","No Data Available");
            case 67:
              return new Element("No Data Available","67","No Data Available","No Data Available");
            case 68:
              return new Element("No Data Available","68","No Data Available","No Data Available");
            case 69:
              return new Element("No Data Available","69","No Data Available","No Data Available");
            case 70:
              return new Element("No Data Available","70","No Data Available","No Data Available");
            case 71:
              return new Element("No Data Available","71","No Data Available","No Data Available");
            case 72:
              return new Element("No Data Available","72","No Data Available","No Data Available");
            case 73:
              return new Element("No Data Available","73","No Data Available","No Data Available");
            case 74:
              return new Element("No Data Available","74","No Data Available","No Data Available");
            case 75:
              return new Element("No Data Available","75","No Data Available","No Data Available");
            case 76:
              return new Element("No Data Available","76","No Data Available","No Data Available");
            case 77:
              return new Element("No Data Available","77","No Data Available","No Data Available");
            case 78:
              return new Element("No Data Available","78","No Data Available","No Data Available");
            case 79:
              return new Element("No Data Available","79","No Data Available","No Data Available");
            case 80:
              return new Element("No Data Available","80","No Data Available","No Data Available");
            case 81:
              return new Element("No Data Available","81","No Data Available","No Data Available");
            case 82:
              return new Element("No Data Available","82","No Data Available","No Data Available");
            case 83:
              return new Element("No Data Available","83","No Data Available","No Data Available");
            case 84:
              return new Element("No Data Available","84","No Data Available","No Data Available");
            case 85:
              return new Element("No Data Available","85","No Data Available","No Data Available");
            case 86:
              return new Element("No Data Available","86","No Data Available","No Data Available");
            case 87:
              return new Element("No Data Available","87","No Data Available","No Data Available");
            case 88:
              return new Element("No Data Available","88","No Data Available","No Data Available");
            case 89:
              return new Element("No Data Available","89","No Data Available","No Data Available");
            case 90:
              return new Element("No Data Available","90","No Data Available","No Data Available");
            case 91:
              return new Element("No Data Available","91","No Data Available","No Data Available");
            case 92:
              return new Element("No Data Available","92","No Data Available","No Data Available");
            case 93:
              return new Element("No Data Available","93","No Data Available","No Data Available");
            case 94:
              return new Element("No Data Available","94","No Data Available","No Data Available");
            case 95:
              return new Element("No Data Available","95","No Data Available","No Data Available");
            case 96:
              return new Element("No Data Available","96","No Data Available","No Data Available");
            case 97:
              return new Element("No Data Available","97","No Data Available","No Data Available");
            case 98:
              return new Element("No Data Available","98","No Data Available","No Data Available");
            case 99:
              return new Element("No Data Available","99","No Data Available","No Data Available");
            case 100:
              return new Element("No Data Available","100","No Data Available","No Data Available");
            case 101:
              return new Element("No Data Available","101","No Data Available","No Data Available");
            case 102:
              return new Element("No Data Available","102","No Data Available","No Data Available");
            case 103:
              return new Element("No Data Available","103","No Data Available","No Data Available");
            case 104:
              return new Element("No Data Available","104","No Data Available","No Data Available");
            case 105:
              return new Element("No Data Available","105","No Data Available","No Data Available");
            case 106:
              return new Element("No Data Available","106","No Data Available","No Data Available");
            case 107:
              return new Element("No Data Available","107","No Data Available","No Data Available");
            case 108:
              return new Element("No Data Available","108","No Data Available","No Data Available");
            case 109:
              return new Element("No Data Available","109","No Data Available","No Data Available");
            case 110:
              return new Element("No Data Available","110","No Data Available","No Data Available");
            case 111:
              return new Element("No Data Available","111","No Data Available","No Data Available");
            case 112:
              return new Element("No Data Available","112","No Data Available","No Data Available");
            case 113:
              return new Element("No Data Available","113","No Data Available","No Data Available");
            case 114:
              return new Element("No Data Available","114","No Data Available","No Data Available");
            case 115:
              return new Element("No Data Available","115","No Data Available","No Data Available");
            case 116:
              return new Element("No Data Available","116","No Data Available","No Data Available");
            case 117:
              return new Element("No Data Available","117","No Data Available","No Data Available");
            case 118:
              return new Element("No Data Available","118","No Data Available","No Data Available");
        
          }

          return Element("No data","No data","No data","No data")

      }


			$('.bd-example-modal-lg').on('show.bs.modal', function (e) {
  				
          var clicked_id = e.relatedTarget.id;
          console.log(clicked_id);
          var clicked_element = getElement(parseInt(clicked_id));

          var atomic_number = clicked_element.atomic_number;
          var atomic_weight = clicked_element.atomic_weight;
          var element_symbol_text = clicked_element.element_symbol_text;
          var element_description = clicked_element.element_description;


  				setElementInformation($(this),element_symbol_text,atomic_number,atomic_weight,element_description);

			})
		});


