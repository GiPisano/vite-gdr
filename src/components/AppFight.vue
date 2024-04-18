<script>
import { store } from "./../store/index.js";
import axios from "axios";

export default {
	data() {
		return {
			userCharacter: {},
			cpuCharacter: {},
			winMessage: "",
			messages: [],
			userAttack: "",
			userDefence: "",
			userLife: "",
			userCounterAttack: 0,
			cpuAttack: "",
			cpuDefence: "",
			cpuLife: "",
			cpuCounterAttack: 0,
		};
	},
	methods: {
		fetchCharacters(
			endpoint = store.api.url + "/characters/" + this.$route.params.character
		) {
			axios.get(endpoint).then((response) => {
				this.userCharacter = response.data.user_character;
				this.cpuCharacter = response.data.cpu_character;
				// this.fight();
			});
		},
		fight() {
			this.userLife = this.userCharacter.life;
			this.cpuLife = this.cpuCharacter.life;

			do {
				// USER ATTACK
				let dado = store.generateRandNumber(1, 20);
				const defence = 10;

				this.userAttack = this.userCharacter.strength + dado;
				this.cpuDefence = this.cpuCharacter.defence + defence;

				if (this.userAttack > this.cpuDefence) {
					this.cpuLife = this.cpuLife - (this.userAttack - this.cpuDefence);
				} else {
					this.cpuCounterAttack = this.cpuDefence - this.userAttack;
					this.userLife = this.userLife - this.cpuCounterAttack;
				}
				console.log(
					`LO USER ATTACCA \n \n 
					user attack: ${this.userAttack} 
					\ncpu defence: ${this.cpuDefence} 
					\ncpu conterattack : ${this.cpuCounterAttack} 
					\nuser life: ${this.userLife} 
					\ncpu life: ${this.cpuLife}`
				);

				this.messages.push(`LO USER ATTACCA 
				user attack: ${this.userAttack} 
				cpu defence: ${this.cpuDefence} 
				cpu conterattack : ${this.cpuCounterAttack} 
				user life: ${this.userLife} 
				cpu life: ${this.cpuLife}`)
				// CPU ATTACK

				dado = store.generateRandNumber(1, 20);

				this.cpuAttack = this.cpuCharacter.strength + dado;
				this.userDefence = this.userCharacter.defence + defence;

				if (this.cpuAttack > this.userDefence) {
					this.userLife = this.userLife - (this.cpuAttack - this.userDefence);
				} else {
					this.cpuCounterAttack = this.userDefence - this.cpuAttack;
					this.cpuLife = this.cpuLife - this.userCounterAttack;
				}
				// console.log(
				// 	`LA CPU ATTACA \n \n cpu attack: ${this.cpuAttack} \nuser defence: ${this.userDefence} \nuser conterattack : ${this.userCounterAttack} \nuser life: ${this.userLife} \ncpu life: ${this.cpuLife}`
				// );

				this.messages.push(`LA CPU ATTACA \n \n cpu attack: ${this.cpuAttack} \nuser defence: ${this.userDefence} \nuser conterattack : ${this.userCounterAttack} \nuser life: ${this.userLife} \ncpu life: ${this.cpuLife}`)

			} while (this.userLife > 0 && this.cpuLife > 0);

			let winner = "";

			// const dado = store.generateRandNumber(1, 20);
			// const defence = 10;
			// const userStrenght = this.userCharacter.strength;
			// const cpuDefence = this.cpuCharacter.defence;
			// if (userStrenght + dado >= cpuDefence + 10) {
			// 	winner = "USER";
			// } else {
			// 	winner = "CPU";
			// }

			if (!(this.cpuLife < 0)) winner = `CPU che ha usato il personaggio ${this.cpuCharacter.name}`;
			if (!(this.userLife < 0)) winner = `USER che ha usato il personaggio ${this.userCharacter.name}`;

			this.winMessage = `IL VINCITORE E' ${winner}.`;


			// console.log(this.messages)
		},
	},
	created() {
		console.log(this.$route.params.character);
		this.fetchCharacters();
	},
};
</script>

<template>
	<div class="container mt-5">
		<div class="row">
			<div class="col-5">
				<div class="card">
					<div class="card-head text-center">
						<h5 class="card-title">USER</h5>
						<p class="card-text">
							<strong>name: </strong>{{ this.userCharacter.name }}
						</p>
					</div>
					<div class="list-group list-group-flush">
						<p class="list-group-item">
							<strong>strength: </strong>{{ this.userCharacter.strength }}
						</p>
						<p class="list-group-item">
							<strong>defence: </strong>{{ this.userCharacter.defence }}
						</p>
						<p class="list-group-item">
							<strong>intelligence: </strong>{{ this.userCharacter.intelligence }}
						</p>
						<p class="list-group-item">
							<strong>speed: </strong>{{ this.userCharacter.speed }}
						</p>
						<p class="list-group-item">
							<strong>life: </strong>{{ this.userCharacter.life }}
						</p>
						<p class="list-group-item">
							<strong>type: </strong>{{ this.userCharacter.type.name }}
						</p>
					</div>
				</div>
			</div>

			<div class="col-2 btn-fight">
				<button class="btn btn-danger" @click="fight()">Fight!!</button>
			</div>

			<div class="col-5">
				<div class="card">
					<div class="card-head text-center">
						<h5 class="card-title">CPU</h5>
						<p class="card-text">
							<strong>name: </strong>{{ this.cpuCharacter.name }}
						</p>
					</div>
					<div class="list-group list-group-flush">
						<p class="list-group-item">
							<strong>strength: </strong>{{ this.cpuCharacter.strength }}
						</p>
						<p class="list-group-item">
							<strong>defence: </strong>{{ this.cpuCharacter.defence }}
						</p>
						<p class="list-group-item">
							<strong>intelligence: </strong>{{ this.cpuCharacter.intelligence }}
						</p>
						<p class="list-group-item">
							<strong>speed: </strong>{{ this.cpuCharacter.speed }}
						</p>
						<p class="list-group-item">
							<strong>life: </strong>{{ this.cpuCharacter.life }}
						</p>
						<p class="list-group-item">
							<strong>type: </strong>{{ this.cpuCharacter.type.name }}
						</p>
					</div>
				</div>
			</div>
		</div>


		<p v-for="message in messages" class="mt-3">{{ message }}</p>
		<p class="mt-3">{{ winMessage }}</p>
	</div>
</template>

<style></style>
