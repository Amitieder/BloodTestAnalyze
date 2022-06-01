<template>
    <div class="app">
        <h1 class="app-title">Blood test analyze</h1>
        <form @submit.prevent="submit">
            <div class="input-container">
                <div class="p-float-label test-text-container">
                    <InputText id="test-text" type="text" pattern="[a-zA-Z0-9(),-:/! ]+" v-model="name" required/>
                    <label for="test-text">Test Name</label>
                </div>
                <div class="p-float-label">
                    <InputText id="test-value" type="number" v-model="value" required/>
                    <label for="test-value">Test Result</label>
                </div>
            </div>
            <Button type="submit" class="p-button-raised">Check result</Button>     
            <div class="result-container">       
                <h2>{{resultName}}</h2>
                <h2 v-if="resultName">-</h2>
                <h2>{{resultEvaluation}}</h2>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: "",
                value: null,
                resultEvaluation: "",
                resultName: ""
            }
        },
        methods: {
            initResult(data) {
                if (data.treshold === -1) {
                    this.resultEvaluation = 'Unknown';
                    this.resultName = '';
                } else {
                    this.resultEvaluation = this.value <= data.treshold ? 'Good!' : 'Bad!';
                    this.resultName = data.testName;
                }
            },

            async submit() {
                const res = await fetch("http://localhost:3000/get-threshold", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ testName: this.name })
                });
            
                if (res.ok) {
                    const data = await res.json();
                    this.initResult(data);
                }
            }
        }
    }
</script>

<style>
    .app {
        text-align: center;
        font-family: Trebuchet MS;
    }

    .p-button {
        background-color: rgb(189, 128, 208) !important;
        border-color: rgb(189, 128, 208) !important;
        font-family: Trebuchet MS !important;
    }

    .app-title { 
        font-size: 50px; font-weight: bold; 
        letter-spacing: -1px; line-height: 1; 
        color: rgb(189, 128, 208); 
    }

    .input-container {
        display: flex;
        justify-content: center;
        padding: 3%;
    }

    .result-container {
        display: flex;
        justify-content: center;
    }

    .test-text-container {
        padding-right: 30px;
    }
</style>