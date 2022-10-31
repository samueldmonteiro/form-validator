# form-validator

Validador de formulário desenvolvido em JavaScript

## Descrição

As regras são implementadas aos inputs dos formulários que possuem a classe (validate-form). Os inputs por sua vez devem possuir o atributo (validate).

## Exemplo

<pre>
  &lt;form class="validate-form"&gt;
    &lt;input type="text" name="email" validate="required|type:email|max:50"&gt;
  &lt;/form&gt;
</pre>
  
### Regras

* required = input required
* min = minimum of characters
* max = maximum characters
* type = validate (email, phone)

### Clone

```
git clone https://github.com/samueldmonteiro/form-validator
```
