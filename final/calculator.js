$(() => {

    let expression = ["("]

    $("#btn-1").on("click", () => {
        f("7")
    })
    $("#btn-2").on("click", () => {
        f("8")
    })
    $("#btn-3").on("click", () => {
        f("9")
    })
    $("#btn-4").on("click", () => {
        f("/")
    })

    $("#btn-5").on("click", () => {
        f("4")
    })
    $("#btn-6").on("click", () => {
        f("5")
    })
    $("#btn-7").on("click", () => {
        f("6")
    })
    $("#btn-8").on("click", () => {
        f("*")
    })

    $("#btn-9").on("click", () => {
        f("1")
    })
    $("#btn-10").on("click", () => {
        f("2")
    })
    $("#btn-11").on("click", () => {
        f("3")
    })
    $("#btn-12").on("click", () => {
        f("-")
    })

    $("#btn-13").on("click", () => {
        f("0")
    })
    $("#btn-14").on("click", () => {
        f(".")
    })
    $("#btn-15").on("click", () => {
        
        expression.push(")")

        calculator(expression)
    })
    $("#btn-16").on("click", () => {
        f("+")
    })

    $("#btn-17").on("click", () => {
        f("sin")
    })
    $("#btn-18").on("click", () => {
        f("cos")
    })
    $("#btn-19").on("click", () => {
        f("tan")
    })
    $("#btn-20").on("click", () => {
        f("log")
    })

    $("#btn-21").on("click", () => {
        f("ln")
    })
    $("#btn-22").on("click", () => {
        f("pi")
    })
    $("#btn-23").on("click", () => {
        f("e")
    })
    $("#btn-24").on("click", () => {
        f("^")
    })

    $("#btn-25").on("click", () => {
        f("(")
    })
    $("#btn-26").on("click", () => {
        f(")")
    })
    $("#btn-27").on("click", () => {
        
        expression = ["("]

        $("#question").text("")
        $("#answer").text("")
    })
    $("#btn-28").on("click", () => {
        
        let tmp = expression.pop()
        let exp = $("#question").text()

        $("#question").text(exp.substr(0, exp.length - tmp.length))
    })

    function f(x) {
        
        const not_number = ["+", "-", "*", "/", "^", "sin", "cos", "tan", "log", "ln", "(", ")", "pi", "e"]

        if(not_number.includes(x)) {
            expression.push(x)
            $("#question").append(x)
        }
        else {
            let tmp = expression.pop()

            if(not_number.includes(tmp)) {
                expression.push(tmp, x)
                $("#question").append(x)
            }
            else {
                expression.push(tmp + x)
                $("#question").append(x)
            }
        }
    }

    function calculator(expression) {

        const operator = ["+", "-", "*", "/", "^"]
        const mapping = ["sin", "cos", "tan", "log", "ln"]
        
        const infix = [...expression]
        
        for(let i = 0; i < infix.length; i++) {
            
            let x = infix[i]
    
            if(mapping.includes(x)) {
                infix.splice(i, 0, "mapping")
                i++
            }
            else if(x === "pi") {
                infix.splice(i, 1, Math.PI)
            }
            else if(x === "e") {
                infix.splice(i, 1, Math.E)
            }
        }
        
        console.log(infix)

        const postfix = []
        const stack = []
    
        for(let i = 0; i < infix.length; i++) {
    
            let x = infix[i]
    
            if(operator.includes(x) || mapping.includes(x)) {
                while(1) {
                    let tmp = stack.pop()
    
                    if(priority(tmp) < priority(x)) {
                        stack.push(tmp, x)
                        break
                    }
                    else {
                        postfix.push(tmp)
                    }
                }
            }
            else if(x === "(") {
                stack.push(x)
            }
            else if(x === ")") {
                while(1){
                    let tmp = stack.pop()
                    
                    if(tmp === "(") {
                        break
                    }
                    else {
                        postfix.push(tmp)
                    }
                }
            }
            else {
                postfix.push(Number(x))
            }
        }
    
        function priority(x) {
    
            if(operator.includes(x)) {
                switch(x) {
                    case "+":
                    case "-":
                        return 1
                    case "*":
                    case "/":
                        return 2
                    default:
                        return 3
                }
            }
            else if(mapping.includes(x)) {
                return 4
            }
            else {
                return 0
            }
        }
    
        console.log(postfix)
    
        for(let i = 0; i < postfix.length; i++) {
    
            let x = postfix[i]
    
            if(operator.includes(x) || mapping.includes(x)) {
                let a = stack.pop()
                let b = stack.pop()
    
                let tmp = calculation(a, b, x)
    
                stack.push(tmp)
            }
            else {
                stack.push(x)
            }
        }
    
        function calculation(x, y, z) {
            
            if(operator.includes(z)) {
                switch(z) {
                    case "+":
                        return y + x
                    case "-":
                        return y - x
                    case "*":
                        return y * x
                    case "/":
                        return y / x
                    default:
                        return Math.pow(y, x)
                }
            }
            else {
                switch(z) {
                    case "sin":
                        return Math.sin(x)
                    case "cos":
                        return Math.cos(x)
                    case "tan":
                        return Math.tan(x)
                    case "log":
                        return Math.log(x) / Math.LN10
                    default:
                        return Math.log(x)
                }
            }
        }
    
        $("#answer").text("= " + String(stack[0]))
    }
})