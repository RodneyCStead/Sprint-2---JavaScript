// Note: I know that the 3 territories are not provinces but I refrence them as so //

// This Java Script file is used to catagorize the provinces (and territories) of Canada by
// alphabetical Order, Population from least to greatest, the percentage of the population
// and will display the results in the console. This program will also display all 
// information from the JSON file to the HTML page.
// Written on: December 7th, 2023
// Written by: Rodney Stead


// Functions//
    // Sort the provinces by name alphabetically.
function sortProvincesByName(data) {
    return data.sort((a, b) => a.Province.localeCompare(b.Province));
}
    // Filter the provinces by population from least to greatest.
    function filterProvincesByPopulation(data, populationThreshold) {
    return data.filter(province => Number(province.Population) > populationThreshold)
               .sort((a, b) => a.Population - b.Population);
}
    // Function required to calculate the population of each province.
    function calculatePopulation(data) {
        let totalPopulation = 0;
        data.forEach(province => {
            totalPopulation += Number(province.Population);
        });
        return totalPopulation;    
    }
    // Function to calculate the percentage of population of each province.
    function calculatePopulationPercentage(data, totalPopulation) {
    return data.map(province => ({
        ...province,
        PopulationPercentage: (Number(province.Population) / totalPopulation) * 100
    }));
    }
// Fetch the data on the provinces of Canada from the Data.json file 
fetch('Data.json')
    .then(response => response.json())
    .then(data => {
        const ProvinceAlpha  = sortProvincesByName(data);
        const ProvincesPop   = filterProvincesByPopulation(data, 0);
        const ProvincePerPop = calculatePopulationPercentage(ProvincesPop, calculatePopulation(ProvincesPop));

        // Displaying the province name and sorted alphabetically
            console.log(`===============================`)    
            console.log(`  List of Provinces by Alphabetical Order`)    
            console.log(`===============================`)    
            ProvinceAlpha.forEach(province => {
            console.log(`Province Name: ${province.Province} || Province Initials: ${province.Initials}`);
            });
        // Displaying the province name and sorted population from least to greatest
            console.log(`==========================================`)    
            console.log(`  List of Provinces by Population from least to greatest`)    
            console.log(`==========================================`)    
            ProvincesPop.forEach(province => {
            console.log(`Province Name: ${province.Province} || Province Population: ${province.Population}`);
            });
        // Displaying the province name, population and percentage of population
            console.log(`===================================`)    
            console.log(`  List of Provinces with Population Percentage`)    
            console.log(`===================================`)    
            ProvincePerPop.forEach(province => {
            console.log(`Province Name: ${province.Province} || Population Percentage: ${province.PopulationPercentage.toFixed(2)}%`);
            });

 // Displaying all information from the JSON file to the HTML page.
    const container = document.getElementById('ProvinceContainer');

    data.forEach(province => {
        try {
            const ProvinceDiv = document.createElement('div');
            ProvinceDiv.className = 'province';
            ProvinceDiv.innerHTML = `
                <h2>Province Name:                 ${province.Province}</h2>
                <p>Province Initials:              ${province.Initials}</p>
                <p>Province Capital:               ${province.Capital}</p>
                <p>Province Population:            ${province.Population}</p>
                <p>Province Premier:               ${province.Premier}</p>
            `;
            container.appendChild(ProvinceDiv);
        } catch (err) {
            console.error(err);
        }
    });  
});