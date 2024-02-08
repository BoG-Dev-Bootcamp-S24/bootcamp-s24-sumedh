document.getElementById('nameForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('nameInput').value;
  
    // Constructing API URLs
    //age-
    const agifyUrl = `https://api.agify.io?name=${name}`;
    //gender-
    const genderizeUrl = `https://api.genderize.io?name=${name}`;
    //nationality-
    const nationalizeUrl = `https://api.nationalize.io?name=${name}`;

    // Students will write async code here to fetch data from the APIs
    // and update the DOM with the results.
    
    // They should use Promise.all to handle the multiple fetch requests.
    const fetchAge = async () => {
        const response = await fetch(agifyUrl);
        if (!response.ok) {
            throw new Error("Network Error");
        }
        return await response.json();
    };

    const fetchGender = async () => {
        const response = await fetch(genderizeUrl);
        if (!response.ok) {
            throw new Error("Network Error");
        }
        return await response.json();
    };

    const fetchNationality = async () => {
        const response = await fetch(nationalizeUrl);
        if (!response.ok) {
            throw new Error("Network Error");
        }
        return await response.json();
    };

    let promises = [];
    promises.push(fetchAge());
    promises.push(fetchGender());
    promises.push(fetchNationality());

    const age = document.getElementById('ageResult')
    const gender = document.getElementById('genderResult')
    const nationality = document.getElementById('nationalityResult')
    Promise.all(promises)
        .then((list) => {
            const [ageString, genderString, nationalityString] = list
            const newageHTML = `<p> ${ageString.age} </p>`;
            age.innerHTML = newageHTML;
            const newgenderHTML = `<p> ${genderString.gender} </p>`;
            gender.innerHTML = newgenderHTML;
            const newnationalityHTML = `<p> ${nationalityString.country[0].country_id} </p>`;
            nationality.innerHTML = newnationalityHTML;
        }
        )
        .catch((error) => {
            age.innerHTML = "Failed to get age";
            gender.innerHTML = "Failed to get gender";
            nationality.innerHTML = "Failed to get nationality";

        });
    // Error handling should also be implemented.
});