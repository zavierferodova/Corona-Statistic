class CoronaData {
    async loadData() {
        this.baseurl = "https://cors-servza.herokuapp.com/https://api.kawalcorona.com/";

        const worldData = await this.getWorldData();
        const indonesiaData = await this.getIndonesiaData();
        const indonesiaProvinceData = await this.getIndonesiaProvinceData();
        const worldCountryData = await this.getWorldCountryData();

        return new Promise((resolve, reject) => {
            if(worldData && indonesiaData && indonesiaProvinceData && worldCountryData) {
                this.worldData = worldData;
                this.indonesiaData = indonesiaData;
                this.indonesiaProvinceData = indonesiaProvinceData;
                this.worldCountryData = worldCountryData;

                resolve("Sucess to get coronavirus cases");
            }
            else
                reject("Failed to get coronavirus cases");
        });
    }

    async getWorldData() {
        const positif = await fetch(`${this.baseurl}positif/`);
        const sembuh =  await fetch(`${this.baseurl}sembuh/`);
        const meninggal = await fetch(`${this.baseurl}meninggal/`);
        
        return [await positif.json(), await sembuh.json(), await meninggal.json()];
    }

    async getIndonesiaData() {
        const response = await fetch(`${this.baseurl}indonesia/`);
        return response.json();
    }

    async getIndonesiaProvinceData() {
        const response = await fetch(`${this.baseurl}indonesia/provinsi/`);
        return response.json();
    }

    async getWorldCountryData() {
        const response = await fetch(`${this.baseurl}`);
        return response.json();
    }
}

export default CoronaData;