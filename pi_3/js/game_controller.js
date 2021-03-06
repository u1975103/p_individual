const back = "../resources/back.png";
const items = ["../resources/cb.png","../resources/co.png","../resources/sb.png",
"../resources/so.png","../resources/tb.png","../resources/to.png"];

var options_data = {
	cards:2, dificulty:"hard"
};

var json = localStorage.getItem("config");
		if(json)
			options_data = JSON.parse(json);


var game = new Vue({
	el: "#game_id",
	data: {
		username:'',
		current_card: [],
		items: [],
		num_cards: 2,
		bad_clicks: 0,
		difficulty: 0,
		timer: 900,
		init: false
	},
	created: function(){
		this.username = sessionStorage.getItem("username","unknown");
		this.num_cards = options_data.cards;
		if (options_data.dificulty == 'easy'){
			this.difficulty = 5;
			this.timer = 1400;
		}
		else if(options_data.dificulty == 'normal'){
			this.difficulty = 10;
			this.timer = 1200;
		}
		else{
			this.difficulty = 20;
			this.timer = 900;
		}
		this.items = items.slice(); // Copiem l'array
		this.items.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		this.items = this.items.slice(0, this.num_cards); // Agafem els primers numCards elements
		this.items = this.items.concat(this.items); // Dupliquem els elements
		this.items.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		for (var i = 0; i < this.items.length; i++){
			this.current_card.push({done: true, texture: this.items[i]});
		}
		this.timeout = setTimeout(funcioGirar, this.timer);
		var item = this.items;
		var card = this.current_card;
		var v = this;
		function funcioGirar(){
			v.init = true;
			card.splice(0, card.length);
			for (var i = 0; i < item.length; i++){
				card.push({done:false, texture: back});
			}
		}
	},
	methods: {
		clickCard: function(i){
			console.log(this.num_cards);
			if (!this.current_card[i].done && this.current_card[i].texture === back)
				Vue.set(this.current_card, i, {done: false, texture: this.items[i]});
		}
	},
	watch: {
		current_card: function(value){
			if (value.texture === back || !this.init) return;
			var front = null;
			var i_front = -1;
			for (var i = 0; i < this.current_card.length; i++){
				if (!this.current_card[i].done && this.current_card[i].texture !== back){
					if (front){
						if (front.texture === this.current_card[i].texture){
							front.done = this.current_card[i].done = true;
							this.num_cards--;
						}
						else{
							Vue.set(this.current_card, i, {done: false, texture: back});
							Vue.set(this.current_card, i_front, {done: false, texture: back});
							this.bad_clicks++;
							break;
						}
					}
					else{
						front = this.current_card[i];
						i_front = i;
					}
				}
			}			
		}
	},
	computed: {
		score_text: function(){
			return 100 - this.bad_clicks * this.difficulty;
		}
	}

});





