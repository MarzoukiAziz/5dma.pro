import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent {
  user: User;
  countries = [
    'France',
    'Tunisie',
    'Algérie',
    'Maroc',
    'États-Unis',
    'Canada',
    'Afghanistan',
    'Albanie',
    'Samoa américaines',
    'Andorre',
    'Angola',
    'Anguilla',
    'Antarctique',
    'Antigua et/ou Barbuda',
    'Argentine',
    'Arménie',
    'Aruba',
    'Australie',
    'Autriche',
    'Azerbaïdjan',
    'Bahamas',
    'Bahreïn',
    'Bangladesh',
    'Barbade',
    'Biélorussie',
    'Belgique',
    ' Belize',
    'Bénin',
    'Bermudes',
    'Bhoutan',
    'Bolivie',
    'Bosnie-Herzégovine',
    'Botswana',
    'Île Bouvet',
    'Brésil',
    "Territoire britannique de l'océan Indien",
    'Brunei Darussalam',
    'Bulgarie',
    'Burkina Faso',
    'Burundi',
    'Cambodge',
    'Cameroun',
    'Cap-Vert',
    'Îles Caïmans',
    'République centrafricaine',
    'Tchad',
    'Chili',
    'Chine',
    ' Île Christmas',
    'Îles Cocos (Keeling)',
    'Colombie',
    'Comores',
    'Congo',
    'Îles Cook',
    'Costa Rica',
    'Croatie (Hrvatska)',
    'Cuba',
    'Chypre',
    ' République tchèque',
    'Danemark',
    'Djibouti',
    'Dominique',
    'République dominicaine',
    'Timor oriental',
    'Équateur',
    'Égypte',
    'El Salvador',
    'Guinée équatoriale',
    'Érythrée',
    'Estonie',
    ,
    'Éthiopie',
    'Îles Falkland (Malvinas)',
    'Îles Féroé',
    'Fidji',
    'Finlande',
    'France métropolitaine',
    'Guyane française',
    'Polynésie française',
    'France méridionale Territoires',
    'Gabon',
    'Gambie',
    'Géorgie',
    'Allemagne',
    'Ghana',
    'Gibraltar',
    'Grèce',
    'Groenland',
    'Grenade',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guinée',
    'Guinée-Bissau',
    'Guyana',
    'Haïti',
    'Îles Heard et Mc Donald',
    'Honduras',
    'Hong Kong',
    'Hongrie',
    'Islande',
    'Inde',
    'Indonésie ',
    "Iran (République islamique d')",
    'Irak',
    'Irlande',
    'Israël',
    'Italie',
    "Côte d'Ivoire",
    'Jamaïque',
    'Japon',
    'Jordanie',
    'Kazakhstan',
    'Kenya ',
    ' Kiribati ',
    ' Corée, République populaire démocratique de ',
    ' Corée, République de ',
    ' Koweït ',
    ' Kirghizistan ',
    ' République démocratique populaire lao ',
    ' Lettonie ',
    ' Liban ',
    ' Lesotho ',
    ' Libéria',
    'Jamahiriya arabe libyenne',
    'Liechtenstein',
    'Lituanie',
    'Luxembourg',
    'Macao',
    'Macédoine',
    'Madagascar',
    'Malawi',
    'Malaisie',
    'Maldives',
    'Mali',
    ' Malte',
    'Îles Marshall',
    'Martinique',
    'Mauritanie',
    'Maurice',
    'Mayotte',
    'Mexique',
    'Micronésie, États fédérés de',
    'Moldavie, République de',
    'Monaco',
    'Mongolie',
    'Montserrat',
    'Mozambique',
    'Myanmar',
    'Namibie',
    'Nauru',
    'Népal',
    'Pays-Bas',
    'Antilles néerlandaises',
    'Nouvelle-Calédonie',
    'Nouvelle-Zélande',
    'Nicaragua ',
    'Niger',
    'Nigeria',
    'Niue',
    'Île Norfolk',
    'Îles Mariannes du Nord',
    'Norvège',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papouasie-Nouvelle-Guinée',
    'Paraguay',
    'Pérou',
    'Philippines',
    'Pitcairn',
    'Pologne',
    'Portugal',
    'Porto Rico',
    'Qatar',
    'Réunion',
    'Roumanie',
    'Fédération de Russie',
    'Rwanda',
    'Saint-Kitts-et-Nevis',
    'Sainte-Lucie',
    'Saint-Vincent-et-les Grenadines',
    'Samoa',
    'Saint-Marin',
    'Sao Tomé-et-Principe',
    'Arabie Saoudite',
    'Sénégal',
    'Seychelles',
    'Sierra Leone',
    'Singapour',
    'Slovaquie',
    'Slovénie',
    'Îles Salomon',
    'Somalie',
    'Afrique du Sud',
    'Géorgie du Sud Îles Sandwich du Sud',
    'Espagne',
    'Sri Lanka',
    'St . Hélène',
    'St. Pierre et Miquelon',
    'Soudan',
    'Suriname',
    'Îles Svalbard et Jan Mayen',
    'Swaziland',
    'Suède',
    'Suisse',
    'République arabe syrienne',
    'Taïwan',
    'Tadjikistan',
    'Tanzanie, République-Unie de',
    'Thaïlande',
    'Togo',
    'Tokelaou',
    'Tonga',
    'Trinité-et-Tobago',
    'Turquie',
    'Turkménistan',
    'Îles Turques et Caïques',
    'Tuvalu',
    'Ouganda',
    'Ukraine',
    'Émirats arabes unis',
    'Royaume-Uni',
    'Îles mineures éloignées des États-Unis',
    'Uruguay',
    'Ouzbékistan',
    'Vanuatu',
    'État de la Cité du Vatican',
    'Venezuela',
    ' Vietnam',
    'Îles Vierges britanniques',
    'Îles Vierges (États-Unis)',
    'Îles Wallis et Futuna',
    'Sahara occidental',
    'Yémen',
    'Yougoslavie',
    'Zaïre',
    'Zambie',
    'Zimbabwe',
  ];
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe((res) => {
      this.user = res;
    });
  }

  submit() {
    this.authService.updateUser(this.user).subscribe((res) => {
      this.router.navigate(['/moncompte']);
      this.toastr.success('Vos informations sont à jour!', 'Succés');
    });
  }
}