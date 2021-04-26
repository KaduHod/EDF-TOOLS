//Jackson e Pullock, 1978 
// Homens 18 á 61 anos de idade, não atleta 
// D= 1,1093800 - 0,0008267 x (x3) + 0,0000016 x (x3)² - 0,0002574 x (x4)
// X3 = (Peito + abdomen + coxa) 
// X4 = IDADE


//preciso de inputs para dobras de peito, abdomen e coxa

class Dados_Jackson_Pullock_1978{
    constructor(sexo,idade,Peitoral, Abdomen, Coxa){
        this.sexo = sexo
        this.Idade = idade
        this.Peitoral = Peitoral
        this.Abdomen = Abdomen
        this.Coxa = Coxa
        this.soma = null
        this.densidade = null
        this.gordura_corporal = null
    }
    soma_dobras(){
        this.soma = this.Peitoral + this.Abdomen + this.Coxa
        return this.soma
    }
    densidade_corporal(){
        this.densidade = 1.1093800 - (0.0008267*this.soma_dobras()) + (0.0000016*Math.pow(this.soma_dobras(),2)) - (0.0002574*this.Idade)
        
        return this.densidade
    }
    siri(){
        this.gordura_corporal = ((4.95/this.densidade)-4.50)*100
        return this.gordura_corporal
    }
}

class Dados_Sloan_Blyth_Burt_Feminino{
    constructor(sexo,idade, Suprailíaca, Tricíptal){
        this.sexo = sexo
        this.Idade = idade
        this.Suprailíaca = Suprailíaca
        this.Tricíptal = Tricíptal
        this.densidade = null
        this.gordura_corporal = null
    }
    densidade_corporal(){
        this.densidade  = 1.0764 - (0.00081*this.Suprailíaca) - (0.00088*this.Tricíptal)
        
        return this.densidade
    }
    siri(){
        this.gordura_corporal = ((4.95/this.densidade)-4.50)*100
        return this.gordura_corporal
    }
}

class Dados_Sloan_Masculino{
    constructor(sexo,idade, Subescapular, Coxa){
        this.sexo = sexo
        this.Idade = idade
        this['Sub-escapular'] = Subescapular
        this.Coxa = Coxa
        this.densidade = null
        this.gordura_corporal = null
    }
    densidade_corporal(){
        this.densidade  = 1.1043 - (0.001327*this.Coxa) - (0.001310*this['Sub-escapular'])
        
        return this.densidade
    }
    siri(){
        this.gordura_corporal = ((4.95/this.densidade)-4.50)*100
        return this.gordura_corporal
    }
}

class Dados_guedes{
    constructor(sexo,idade,Tricíptal, Suprailíaca, Abdomen, Subescapular, Coxa){
        this.Sexo = sexo
        this.Idade = idade
        this.Tricíptal = Tricíptal
        this.Suprailíaca = Suprailíaca
        this['Sub-escapular'] =Subescapular
        this.Abdomen = Abdomen
        this.Coxa = Coxa
        this.densidade = null
        this.gordura_corporal = null
    }

    densidade_corporal(){
        if(this.Sexo == 'M'){
            this.densidade = 1.17136 - (0.06706*Math.log10((this.Tricíptal + this.Suprailíaca + this.Abdomen)))
            return this.densidade
        }else{
            if(this.Sexo == 'F'){
                this.densidade = 1.166550 - (0.07063*Math.log10((this['Sub-escapular'] + this.Suprailíaca + this.Coxa)))
                return this.densidade
            }else{
                throw new Error('Sexo não identificado');
            }
        }
    }
    siri(){
        this.gordura_corporal = ((4.95/this.densidade)-4.50)*100
        return this.gordura_corporal
    }
}


/*
 var JP = density_jackson_pullock1978(dobras_)
 var SBB_DEN = density_Sloan_Blyth_Burt(dobras_)
 var guedes_den = density_guedes(dobras_)
 console.log(siri(density_guedes(dobras_)))*/