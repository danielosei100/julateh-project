 $(".button-collapse").sideNav();
 function sendRequest(u){
//        // Send request to server
//        //u a url as a string
//        //async is type of request
        // alert(u);
        var obj=$.ajax({url:u,async:false});
//
//        alert(obj);
//        //Convert the JSON string to object
       var result=$.parseJSON(obj.responseText);
//         alert(result);
    return result;  //return object
       
    }

$(function(){
  $("#log").click(function(){
    login();
})
});

 function login(){
     var usn=$("#username").val();
     var pass=$("#tex_password").val();
     if(usn==""){
         alert("please enter your user name");
         return;
     }
     if(pass==""){
         alert("please enter your password");
         return;
     }
     else{
     var save ="controller.php?cmd=1&username="+usn+"&password="+pass;
     prompt("url: ",save);
     var request = sendRequest("controller.php?cmd=1&username="+usn+"&password="+pass);

     if(request.result==1){
         alert("success: "+request.message);
         location.href="addstock.html";
            return;
     }
     else{
         alert("failed: "+request.message);
         return;
     }
 }
 }

function rssfeeds(){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            document.getElementById("rs").innerHTML=xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET","controller.php?cmd=2",true);
    xmlhttp.send();
}

$(function(){
    $("#hid").click(function(){
       addsavestock();
   });
});

function addsavestock(){
    var productid=$("#text_id").val();
    var productname=$("#text_name").val();
    var productquant=$("#text_quant").val();
    var productprice=$("#text_price").val();
    var suppliername=$("#text_supplier").val();
    var brandname=$("#text_brandname").val();
    if(productid==""){
      alert("please enter product id");
      return;
    }else if(productname==""){
      alert("please enter product name");
      return;
    }
    else if(productquant==""){
      alert("please enter product quant");
      return;
    }else if(productprice==""){
      alert("please enter product price");
      return;

    }else if(suppliername==""){
      alert("please enter suppliername");
      return;
    }else if(brandname==""){
      alert("please enter brandname");
      return;
    }
    else{
    var request=sendRequest("controller.php?cmd=3&productid="+productid+"&productname="+productname+"&productquant="+productquant+"&productprice="+productprice+"&suppliername="+suppliername+"&brandname="+brandname);
    alert(request);
    if(request.result==1){
        document.getElementById("res1").innerHTML=request.message;
        //alert(request.message);
        return;
    }else{
        alert(request.message);
        return;
    }

    }
    
}

function displayallstock(){
    var save="controller.php?cmd=4";
    prompt("url ",save);
    var request= sendRequest(save);
    if(request.result==1){
       var stocktable= document.getElementById("stocktable");
        
        for(var i =0 ;i<request.product.length;i++){
           
            var kabrow=stocktable.rows.length;
          var rows=stocktable.insertRow(kabrow);
        
        productid=rows.insertCell(0);
        productname=rows.insertCell(1);
        productquant=rows.insertCell(2);
        productprice=rows.insertCell(3);
        suppliername=rows.insertCell(4);
        brandname=rows.insertCell(5);
        
        productid.innerHTML=request.product[i].productid;
        productname.innerHTML=request.product[i].productname;
        productquant.innerHTML=request.product[i].productquant;
        productprice.innerHTML=request.product[i].productprice;
        suppliername.innerHTML=request.product[i].suppliername;
        brandname.innerHTML=request.product[i].Brandname;
        
           
        }
        
        
    }
}

function sell(){
    var customercellno=document.getElementById("text_cel").value;
    var productid=document.getElementById("text_ids").value;
    var productname= document.getElementById("text_names").value;
    var productquant=document.getElementById("text_quants").value;
    var productprice=document.getElementById("text_prices").value;
    var discount = document.getElementById("text_discount").value;
    var cost = document.getElementById("text_cost").value;
    var save="controller.php?cmd=5&customercellno="+customercellno+"&productid="+productid
    +"&productname="+productname+"&productquant="+productquant+"&productprice="
    +productprice+"&cost="+cost+"&discount="+discount;
    var obj=sendRequest(save);
    if(obj.result==1){
        alert(obj.message);
        return;
    }
    else{
        alert(obj.message);
        return;
    }
}

function updatequant(){
    var qq=$("#text-quants").val();
    var id =$("#text_ids").val();
    var request =sendRequest("controller.php?cmd=6&productid="+id);
    if(request.result==1){
        var pr=request.product;
        var q=pr[0]['productquant'];
        var q1=parseInt(q);
        var qq1=parseInt(qq);
        var kk=q1-qq1;
        var request1=sendRequest("controller.php?cmd=8&productid="+id+"&quant="+kk);
        if(request.result==1){
            alert(request1.message);
            
        }
        else{
            alert(request1.message);
        }
    }
    else{
        alert(request.message);
    }
    $(function(){
    $('#pur').click(function(){
      updatequant();
      sell();
    })
  });
}
function sch(){
    var customercellno=document.getElementById("text_cell").value;
    var discount=document.getElementById("text_discount").value;
    var url=("controller.php?cmd=8&pone="+customercellno+"&disc="+discount);
    prompt("url",url);
    var req=sendRequest(url);
    
          alert("req");
          return;
  }
function go(){
    var id=$('#text_id').val();
    var request=sendRequest("controller.php?cmd=6&id="+id);
    if(request.result==1){
      var pr=request.product;
      var p=pr[0]['productprice'];
      var n=pr[0]['productquant'];
      document.getElementById("text_prices").value=p;
      document.getElementById("text_names").value=n;
      return;
    }
  }
function cal(){
  var qq=$('#text_quant').val();
  
  var id=$('#text_id').val();
    var request=sendRequest("controller.php?cmd=6&id="+id);
    if(request.result==1){
      var pr=request.product;
      var q=pr[0]['productquant'];
      var q1=parseInt(q);
      var qq1=parseInt(qq);
      if(qq1>=q1){
        alert("Sorry there is limited stock");
        return;
      }
      else{

  var pr=document.getElementById("text_price").value;
  var co=qq*pr;
  document.getElementById("tex_cost").value=co;
  if(co>500){

    alert("You have of 10% on next shopping");
    var disc=co*0.1
    var roundup=disc.toFixed(2);
    document.getElementById("text_discount").value=roundup;
    return;
  }
  else{
    document.getElementById("text_discount").value=0;
    return;
  }
}
  
}
}






   