<script>
import { store } from "./../store/index.js";
import axios from "axios";

export default {
	data() {
		return {
			userCharacter: {},
			cpuCharacter: {},
		};
	},
	methods: {
		fetchCharacters(
			endpoint = store.api.url + "/characters/" + this.$route.params.character
		) {
			axios.get(endpoint).then((response) => {
				console.log(response.data);
				this.userCharacter = response.data.user_character;
				this.cpuCharacter = response.data.cpu_character;
				this.fight();
			});
		},
		fight() {
			let winMessage = "";
			let winner = "";

			const dado = store.generateRandNumber(1, 20);
			const userStrenght = this.userCharacter.strength;
			const cpuDefence = this.cpuCharacter.defence;
			if (userStrenght + dado >= cpuDefence + 10) {
				winner = "USER";
			} else {
				winner = "CPU";
			}
			winMessage = `Il personaggio ${
				this.userCharacter.name
			} scelto dall'utente ha attaco di valore ${userStrenght} + valore del dado ${dado} = ${
				userStrenght + dado
			}. \nIl personaggio ${
				this.cpuCharacter.name
			} scelto dalla cpu ha difesa di valore ${cpuDefence} + 10. \nIl vincitore è ${winner}.`;
			console.log(winMessage);
		},
	},
	created() {
		console.log(this.$route.params.character);
		this.fetchCharacters();
	},
};
</script>

<template></template>

<style></style>
