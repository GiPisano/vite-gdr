<script>
import { store } from "./../store/index.js";
import axios from "axios";

export default {
	data() {
		return {
			store,
			title: "characters",
			characters: [],
		};
	},

	methods: {
		fetchCharacters(endpoint = store.api.url + "/characters") {
			axios.get(endpoint).then((response) => {
				this.characters = response.data;
			});
		},
	},

	created() {
		this.fetchCharacters();
	},
};
</script>

<template>
	<div class="container py-4">
		<h1>Characters list</h1>
		<table class="table">
			<thead>
				<tr>
					<th scope="col">name</th>
					<th scope="col">strength</th>
					<th scope="col">defence</th>
					<th scope="col">intelligence</th>
					<th scope="col">speed</th>
					<th scope="col">life</th>
					<th scope="col">type</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="character in characters">
					<td>
						{{ character.name }}
					</td>
					<td>{{ character.strength }}</td>
					<td>{{ character.defence }}</td>
					<td>{{ character.speed }}</td>
					<td>{{ character.life }}</td>
					<td>{{ character.intelligence }}</td>
					<td>{{ character.type.name }}</td>
					<td>
						<router-link
							class="btn btn-primary"
							:to="{ name: 'fight', params: { character: character.id } }"
							>FIGHT!!</router-link
						>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style></style>
