



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
                As a free element it is a steel-gray, strong, lightweight and brittle alkaline earth metal.");
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
                decaying with a half-life of about 5,730 years.[14] Carbon is one of the few elements known since antiquity.[15] (Source: Wikipeida)");
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
                it is extremely reactive: almost all other elements, including some noble gases, form compounds with fluorine.");
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
              return new Element("H","1","1.007","Hydrogen");
            case 27:
              return new Element("He","2","4.007","Helium");
            case 28:
              return new Element("Li","3","6.94","Lithium");
            case 29:
              return new Element("Li","3","6.94","Lithium");
            case 30:
              return new Element("Li","3","6.94","Lithium");
            case 31:
              return new Element("Li","3","6.94","Lithium");
            case 31:
              return new Element("Li","3","6.94","Lithium");
            case 32:
              return new Element("Li","3","6.94","Lithium");
            case 33:
              return new Element("Li","3","6.94","Lithium");
            case 34:
              return new Element("Li","3","6.94","Lithium");
            case 35:
              return new Element("Li","3","6.94","Lithium");
            case 36:
              return new Element("Li","3","6.94","Lithium");
            case 37:
              return new Element("H","1","1.007","Hydrogen");
            case 38:
              return new Element("He","2","4.007","Helium");
            case 39:
              return new Element("Li","3","6.94","Lithium");
            case 40:
              return new Element("Li","3","6.94","Lithium");
            case 41:
              return new Element("Li","3","6.94","Lithium");
            case 42:
              return new Element("Li","3","6.94","Lithium");
            case 43:
              return new Element("Li","3","6.94","Lithium");
            case 44:
              return new Element("Li","3","6.94","Lithium");
            case 45:
              return new Element("Li","3","6.94","Lithium");
            case 46:
              return new Element("Li","3","6.94","Lithium");
            case 47:
              return new Element("H","1","1.007","Hydrogen");
            case 48:
              return new Element("He","2","4.007","Helium");
            case 49:
              return new Element("Li","3","6.94","Lithium");
            case 50:
              return new Element("Li","3","6.94","Lithium");
            case 51:
              return new Element("Li","3","6.94","Lithium");
            case 52:
              return new Element("Li","3","6.94","Lithium");
            case 53:
              return new Element("Li","3","6.94","Lithium");
            case 54:
              return new Element("Li","3","6.94","Lithium");
            case 55:
              return new Element("Li","3","6.94","Lithium");
            case 56:
              return new Element("Li","3","6.94","Lithium");
            case 57:
              return new Element("H","1","1.007","Hydrogen");
            case 58:
              return new Element("He","2","4.007","Helium");
            case 59:
              return new Element("Li","3","6.94","Lithium");
            case 60:
              return new Element("Li","3","6.94","Lithium");
            case 61:
              return new Element("Li","3","6.94","Lithium");
            case 62:
              return new Element("Li","3","6.94","Lithium");
            case 63:
              return new Element("Li","3","6.94","Lithium");
            case 64:
              return new Element("Li","3","6.94","Lithium");
            case 65:
              return new Element("Li","3","6.94","Lithium");
            case 66:
              return new Element("Li","3","6.94","Lithium");
            case 67:
              return new Element("H","1","1.007","Hydrogen");
            case 68:
              return new Element("He","2","4.007","Helium");
            case 69:
              return new Element("Li","3","6.94","Lithium");
            case 70:
              return new Element("Li","3","6.94","Lithium");
            case 71:
              return new Element("Li","3","6.94","Lithium");
            case 72:
              return new Element("Li","3","6.94","Lithium");
            case 73:
              return new Element("Li","3","6.94","Lithium");
            case 74:
              return new Element("Li","3","6.94","Lithium");
            case 75:
              return new Element("Li","3","6.94","Lithium");
            case 76:
              return new Element("Li","3","6.94","Lithium");
            case 77:
              return new Element("H","1","1.007","Hydrogen");
            case 78:
              return new Element("He","2","4.007","Helium");
            case 79:
              return new Element("Li","3","6.94","Lithium");
            case 80:
              return new Element("Li","3","6.94","Lithium");
            case 81:
              return new Element("Li","3","6.94","Lithium");
            case 82:
              return new Element("Li","3","6.94","Lithium");
            case 83:
              return new Element("Li","3","6.94","Lithium");
            case 84:
              return new Element("Li","3","6.94","Lithium");
            case 85:
              return new Element("Li","3","6.94","Lithium");
            case 86:
              return new Element("Li","3","6.94","Lithium");
            case 87:
              return new Element("H","1","1.007","Hydrogen");
            case 88:
              return new Element("He","2","4.007","Helium");
            case 89:
              return new Element("Li","3","6.94","Lithium");
            case 90:
              return new Element("Li","3","6.94","Lithium");
            case 91:
              return new Element("Li","3","6.94","Lithium");
            case 92:
              return new Element("Li","3","6.94","Lithium");
            case 93:
              return new Element("Li","3","6.94","Lithium");
            case 94:
              return new Element("Li","3","6.94","Lithium");
            case 95:
              return new Element("Li","3","6.94","Lithium");
            case 96:
              return new Element("Li","3","6.94","Lithium");
            case 97:
              return new Element("H","1","1.007","Hydrogen");
            case 98:
              return new Element("He","2","4.007","Helium");
            case 99:
              return new Element("Li","3","6.94","Lithium");
            case 100:
              return new Element("Li","3","6.94","Lithium");
            case 101:
              return new Element("Li","3","6.94","Lithium");
            case 102:
              return new Element("Li","3","6.94","Lithium");
            case 103:
              return new Element("Li","3","6.94","Lithium");
            case 104:
              return new Element("Li","3","6.94","Lithium");
            case 105:
              return new Element("Li","3","6.94","Lithium");
            case 106:
              return new Element("Li","3","6.94","Lithium");
            case 107:
              return new Element("H","1","1.007","Hydrogen");
            case 108:
              return new Element("He","2","4.007","Helium");
            case 109:
              return new Element("Li","3","6.94","Lithium");
            case 110:
              return new Element("Li","3","6.94","Lithium");
            case 111:
              return new Element("Li","3","6.94","Lithium");
            case 112:
              return new Element("Li","3","6.94","Lithium");
            case 113:
              return new Element("Li","3","6.94","Lithium");
            case 114:
              return new Element("Li","3","6.94","Lithium");
            case 115:
              return new Element("Li","3","6.94","Lithium");
            case 116:
              return new Element("Li","3","6.94","Lithium");
            case 117:
              return new Element("H","1","1.007","Hydrogen");
            case 118:
              return new Element("He","2","4.007","Helium");
        
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


