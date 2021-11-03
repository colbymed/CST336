document.querySelector("#button").addEventListener("click", getPlayers);
getTeams();

async function getTeams() {
    let url = `https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&season='2021'&sort_order=name_asc&team_all_season.col_in=name_display_full&team_all_season.col_in=team_id`;
    let data = await fetchData(url);
    for (i = 0; i < data.team_all_season.queryResults.row.length; i++) {
        document.querySelector("#teams").innerHTML += `<option value="${data.team_all_season.queryResults.row[i].team_id}"> ${data.team_all_season.queryResults.row[i].name_display_full} </option>`;
    }
}
async function getPlayers() {
    let team_id = document.querySelector("#teams").value;
    let roster = document.querySelector("#roster");
    roster.innerHTML = `<table class='table table-striped'>
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Birthday</th>
                <th scope="col">Height</th>
                <th scope="col">Weight</th>
                <th scope="col">Position</th>
                <th scope="col">Throws</th>
                <th scope="col">Bats</th>
            </tr>
        </thead>
        <tbody id="rows">`;
    if (isValid(team_id)) {
        let url = `https://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season='2021'&end_season='2021'&team_id='${team_id}'`;
        let data = await fetchData(url);
        let players = data.roster_team_alltime.queryResults.row;
        for (i = 0; i < players.length; i++) {
            if (players[i].status_short == "Active") {
                document.querySelector("#rows").innerHTML += `
                <tr>
                    <th scope="row">${players[i].jersey_number}</th>
                    <td>${players[i].name_first_last}</td>
                    <td>${players[i].birth_date.substring(0,10)}
                    <td>${players[i].height_feet}\'${players[i].height_inches}\"</td>
                    <td>${players[i].weight}</td>
                    <td>${players[i].primary_position}</td>
                    <td>${players[i].throws}</td>
                    <td>${players[i].bats}</td>
                </tr>`  
            }
        }
        roster.innerHTML += `</tbody></table>`
    }
}
async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
function isValid(id) {
    if (id == "-1") {
        document.querySelector("#valid").innerHTML = "<div class='alert alert-danger' role='alert'>No Team Selected!</div>";
        return false;
    }
    else {
        document.querySelector("#valid").innerHTML = "";
        return true;
    }
}