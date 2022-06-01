<template>
    <div class="app">
        <h1>Blood test analyze</h1>
        <form @submit.prevent="submit">
            <div class="input-container">
                <div class="p-float-label test-text-container">
                    <InputText id="test-text" type="text" pattern="[a-zA-Z0-9(),-:/! ]+" v-model="testText" required/>
                    <label for="test-text">Test Name</label>
                </div>
                <div class="p-float-label">
                    <InputText id="test-value" type="number" v-model="testValue" required/>
                    <label for="test-value">Test Result</label>
                </div>
            </div>
            <Button type="submit" class="p-button-raised">Check result</Button>     
            <div class="result-container">       
                <h2>{{testResultName}}</h2>
                <h2 v-if="testResultName">-</h2>
                <h2>{{testResultEvaluation}}</h2>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                testText: "",
                testValue: null,
                testResultEvaluation: "",
                testResultName: ""
            }
        },
        methods: {
            initResult(data) {
                if(data.matchedTreshold === -1) {
                    this.testResultEvaluation = 'Unknown';
                    this.testResultName = '';
                } else {
                    this.testResultEvaluation = this.testValue <= data.matchedTreshold ? 'Good!' : 'Bad!';
                    this.testResultName = data.matchedTestName;
                }
            },

            async submit() {
                const res = await fetch("http://localhost:3000/get-threshold", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ testText: this.testText })
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

    h1 { 
        font-size: 50px; font-weight: bold; 
        letter-spacing: -1px; line-height: 1; 
        color: rgb(189, 128, 208); 
    }

    .input-container{
        display: flex;
        justify-content: center;
        padding: 3%;
    }

    .result-container{
        display: flex;
        justify-content: center;
    }

    .test-text-container {
        padding-right: 30px;
    }

    .h3 {
        padding-top: 30px;
    }
</style>