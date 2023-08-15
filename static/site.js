
function send_data(){
    var item_type = document.getElementById('item_type').value
    $.ajax({
        url: '/data_received',
        type: 'POST',
        data: {'name': item_type},
    // After the ajax 'POST' call is finished, call the ajax 'GET' function
    }).done(function(){  
        receive_data() 
        console.log(item_type)
        document.getElementById('item_type').value = ""
        document.querySelector(".itemHolder").innerHTML = ""
    })
}


function receive_data(){
    $.ajax({
        url: '/data_sent',
        method: 'GET',
        success: function(result){
            parse_data(result)
        }
    })
}

function parse_data(data){
    const items = document.querySelector(".itemHolder");
    for (let i = 0; i < data.length; i+=1){
        let code = `\
        <div class="card">
            <a href="${data[i][2]}">
            <img src="${data[i][0]}" alt="">
                <div class="cardText">
                    <h2 class="brandText">${data[i][1]}</h2>
                    <p class="itemName">${data[i][3]}</p>
                    <h3 class="itemPrice">$${data[i][4]}</h3>
                    <h5 class="savingPercentage">${data[i][6]}% off</h5>
                    <h5 class="itemRating">${data[i][8]} ⭐</h5>
                    <h6 class="numRatings">${data[i][9]} ✍</h6>
                </div>
            </a>   
        </div>
        `;
        items.innerHTML += code;
    }
}