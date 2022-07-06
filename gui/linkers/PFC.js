window.addEventListener("DOMContentLoaded", (event) => {
  // -----------------
  // JEU : pierre, feuille, ciseaux
  // -----------------
  // Définition de l objet PFC
  var PFC = {
    init: function () {
      this.equal = "&eacutegalit&eacute";
      this.win = "gagn&eacute";
      this.lose = "perdu";
      this.txt_equal = "&eacutegalit&eacute";
      this.txt_win = "Vous gagnez !";
      this.txt_lose = "Vous avez perdu.";

      this.my_point = 0;
      this.ia_point = 0;
      this.count = 0;

      this.show_result = document.getElementById("PFC_result");
      this.show_result.innerHTML = "";
      this.txt_result = "";

      this.items = {
        0: {
          nom: "Pierre",
          url: "https://www.jerome-reaux-creations.fr/DVP/codepen/shifumi/1-pierre.jpg",
        },
        1: {
          nom: "Feuille",
          url: "https://www.jerome-reaux-creations.fr/DVP/codepen/shifumi/2-feuille.jpg",
        },
        2: {
          nom: "Ciseaux",
          url: "https://www.jerome-reaux-creations.fr/DVP/codepen/shifumi/3-ciseaux.jpg",
        },
      };
      // -----------------
      // Création des boutons
      this.PFC_buttons = document.getElementById("PFC_buttons");
      for (idx in this.items) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.value = idx;
        btn.classList.add("PFC_btn");
        // --------
        var img = document.createElement("img");
        img.alt = this.items[idx].nom;
        img.src = this.items[idx].url;
        btn.append(img);
        // --------
        // au clic sur le bouton : on joue
        btn.addEventListener(
          "click",
          function () {
            PFC.play(this.value);
          },
          false
        );
        // --------
        this.PFC_buttons.append(btn);
      }

      // -----------------
      // bouton "rejouer" : le bouton n'existe pas dans le DOM au départ.
      // on doit le relier à un élément existant
      document.body.addEventListener("click", function (event) {
        if (event.target.className == "PFC_btn_replay") {
          PFC.reset();
        }
      });
      // -----------------
    },
    play: function (player_bet) {
      var i = Number(player_bet);
      console.log(i);
      var j = Math.floor(Math.random() * 3); // 0, 1 or 2

      if (this.my_point < 3 && this.ia_point < 3) {
        // il faut 3 victoires
        this.show_result.innerHTML += this.score(i, j);
        this.count++;
      }

      if ((this.my_point >= 3 || this.ia_point >= 3) && this.txt_result == "") {
        // on a 3 victoires
        this.show_result.innerHTML += this.result(this.my_point, this.ia_point);
      }
    },
    score: function (i, j) {
      var txtHTML = "";
      //      txtHTML += "(vous) <b>" + this.items[i].nom + "</b> - (IA) <b>" + this.items[j].nom + "</b> : ";

      if (i === j) {
        txtHTML +=
          '<img src="' +
          this.items[i].url +
          '" alt="' +
          this.items[i].nom +
          '" /><img src="' +
          this.items[j].url +
          '" alt="' +
          this.items[j].nom +
          '" />';
        txtHTML += '<span class="equal">' + this.equal + "</span><br />";
      } else if (
        (i == 0 && j == 2) ||
        (i == 1 && j == 0) ||
        (i == 2 && j == 1)
      ) {
        txtHTML +=
          '<img class="win" src="' +
          this.items[i].url +
          '" alt="' +
          this.items[i].nom +
          '" /><img class="lose" src="' +
          this.items[j].url +
          '" alt="' +
          this.items[j].nom +
          '" />';
        txtHTML += '<span class="win">' + this.win + "</span><br />";
        this.my_point++;
      } else {
        txtHTML +=
          '<img class="lose" src="' +
          this.items[i].url +
          '" alt="' +
          this.items[i].nom +
          '" /><img class="win" src="' +
          this.items[j].url +
          '" alt="' +
          this.items[j].nom +
          '" />';
        txtHTML += '<span class="lose">' + this.lose + "</span><br />";
        this.ia_point++;
      }
      txtHTML +=
        "Score : " + this.my_point + " - " + this.ia_point + "<br /><br />";
      return txtHTML;
    },
    result: function (my_point, ia_point) {
      var txtHTML = "";
      if (this.my_point == this.ia_point) {
        this.txt_result = '<span class="equal">' + this.txt_equal + "</span>";
      } else if (this.my_point > this.ia_point) {
        this.txt_result = '<span class="win">' + this.txt_win + "</span>";
      } else {
        this.txt_result = '<span class="lose">' + this.txt_lose + "</span>";
      }
      txtHTML +=
        "<h4>R&eacutesultat final (en " +
        this.count +
        " coups) : <b>" +
        this.txt_result +
        "</b></h4>";
      txtHTML +=
        '<button type="button" class="PFC_btn_replay">Rejouer ?</button><br />';
      return txtHTML;
    },
    reset: function () {
      this.txt_result = "";
      this.show_result.innerHTML = "";
      this.my_point = 0;
      this.ia_point = 0;
      this.count = 0;
    },
  };
  // -----------------
  // lancement du jeu :
  document.body.onload = function () {
    PFC.init(); // on initialise PFC
  };
  // -----------------
});
