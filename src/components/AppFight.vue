<script>
import { store } from "./../store/index.js";
import axios from "axios";

export default {
	data() {
		return {
			userCharacter: {},
			cpuCharacter: {},
			winMessage: "",
		};
	},
	methods: {
		fetchCharacters(
			endpoint = store.api.url + "/characters/" + this.$route.params.character
		) {
			axios.get(endpoint).then((response) => {
				this.userCharacter = response.data.user_character;
				this.cpuCharacter = response.data.cpu_character;
				this.fight();
			});
		},
		fight() {
			let winner = "";

			const dado = store.generateRandNumber(1, 20);
			const defence = 10;
			const userStrenght = this.userCharacter.strength;
			const cpuDefence = this.cpuCharacter.defence;
			if (userStrenght + dado >= cpuDefence + 10) {
				winner = "USER";
			} else {
				winner = "CPU";
			}
			this.winMessage = `Il personaggio ${this.userCharacter.name
				} scelto dall'utente ha attaco di valore ${userStrenght} + valore del dado ${dado} = ${userStrenght + dado
				}. \nIl personaggio ${this.cpuCharacter.name
				} scelto dalla cpu ha difesa di valore ${cpuDefence} + 10 = ${cpuDefence + defence} . \nIl vincitore è ${winner}.`;
			console.log(winMessage);
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
			<div class="col-6">
				<div class="card">
					<div class="card-head text-center">
						<h5 class="card-title">USER</h5>
						<p class="card-text"><strong>name: </strong>{{ this.userCharacter.name }}</p>
					</div>
					<div class="list-group list-group-flush">
						<p class="list-group-item"><strong>strength: </strong>{{ this.userCharacter.strength }}</p>
						<p class="list-group-item"><strong>defence: </strong>{{ this.userCharacter.defence }}</p>
						<p class="list-group-item"><strong>intelligence: </strong>{{ this.userCharacter.intelligence }}
						</p>
						<p class="list-group-item"><strong>speed: </strong>{{ this.userCharacter.speed }}</p>
						<p class="list-group-item"><strong>life: </strong>{{ this.userCharacter.life }}</p>
						<p class="list-group-item"><strong>type: </strong>{{ this.userCharacter.type.name }}</p>
					</div>
				</div>
			</div>

			<div class="col-6">
				<div class="card">
					<div class="card-head text-center">
						<h5 class="card-title">CPU</h5>
						<p class="card-text"><strong>name: </strong>{{ this.cpuCharacter.name }}</p>
					</div>
					<div class="list-group list-group-flush">
						<p class="list-group-item"><strong>strength: </strong>{{ this.cpuCharacter.strength }}</p>
						<p class="list-group-item"><strong>defence: </strong>{{ this.cpuCharacter.defence }}</p>
						<p class="list-group-item"><strong>intelligence: </strong>{{ this.cpuCharacter.intelligence }}
						</p>
						<p class="list-group-item"><strong>speed: </strong>{{ this.cpuCharacter.speed }}</p>
						<p class="list-group-item"><strong>life: </strong>{{ this.cpuCharacter.life }}</p>
						<p class="list-group-item"><strong>type: </strong>{{ this.cpuCharacter.type.name }}</p>
					</div>
				</div>
			</div>
		</div>

		<p class="mt-3">{{ winMessage }}</p>
	</div>
</template>

<style></style>