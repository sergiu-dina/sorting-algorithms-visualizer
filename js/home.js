"use strict";
document.getElementById("bubbleVisibility").style.visibility="hidden";
document.getElementById("insertionVisibility").style.visibility="hidden";
document.getElementById("selectionVisibility").style.visibility="hidden";
document.getElementById("quickVisibility").style.visibility="hidden";
document.getElementById("mergeVisibility").style.visibility="hidden";

let slider = document.getElementById("myRange");
let generateNewArray=document.getElementById("generate-array");
let bubbleSort=document.getElementById("bubble-sort");
let insertionSort=document.getElementById("insertion-sort");
let selectionSort=document.getElementById("selection-sort");
let quickSort=document.getElementById("quick-sort");
let mergeSort=document.getElementById("merge-sort");
let sort=document.getElementById("sort");
document.getElementById("sort").style.visibility = "hidden";

document.getElementById("quick-sort").disabled=true;
document.getElementById("insertion-sort").disabled=true;
document.getElementById("merge-sort").disabled=true;
document.getElementById("bubble-sort").disabled=true;
document.getElementById("selection-sort").disabled=true;

let size=50;
let speed=20;
let randoms=[];
let indexes=[];
let ctx=document.getElementById('arrayNumbers').getContext('2d');
let chart=new Chart(ctx);

let b=false,i=false,s=false,q=false,m=false;

class Pair{
    constructor(number,index){
        this.num=number;
        this.ind=index;
    }

}

slider.oninput = function() {
    size=this.value;
    if(this.value<=15)
        speed=150;
    if(this.value>15&&this.value<30)
        speed=50;
    if(this.value>=30&&this.value<40)
        speed=30;
    if(this.value>=40&&this.value<=50)
        speed=20;
    if(this.value>50&&this.value<=75)
        speed=10;
    if(this.value>75&&this.value<=100)
        speed=2;
    randoms=arrayOfRandomNumbers(this.value);
    indexes=arrayOfIndices(this.value);

    chart=createChart(indexes,randoms);

    document.getElementById("quick-sort").disabled=false;
    document.getElementById("insertion-sort").disabled=false;
    document.getElementById("merge-sort").disabled=false;
    document.getElementById("bubble-sort").disabled=false;
    document.getElementById("selection-sort").disabled=false;
}

generateNewArray.onclick=function(){
    randoms=arrayOfRandomNumbers(size);
    indexes=arrayOfIndices(size);
    
    chart=createChart(indexes,randoms);

    document.getElementById("quick-sort").disabled=false;
    document.getElementById("insertion-sort").disabled=false;
    document.getElementById("merge-sort").disabled=false;
    document.getElementById("bubble-sort").disabled=false;
    document.getElementById("selection-sort").disabled=false;
}

sort.onclick=async function(){
    if(b===true)
    {
        let sortedArray=bubbleSortFunction(randoms);
        chart.update(0);
    }
    if(i===true)
    {
        console.log(randoms);
        let sortedArray=insertionSortFunction(randoms);
        console.log(sortedArray);
    }
    if(s===true)
    {
        let sortedArray=selectionSortFunction(randoms);
    }
    if(q===true)
    {
        let sortedArray=await quickSortFunction(randoms,0,randoms.length-1);
        chart.update(0);
        document.getElementById("generate-array").disabled=false;
        document.getElementById("myRange").disabled=false;
        document.getElementById("insertion-sort").disabled=false;
        document.getElementById("selection-sort").disabled=false;
        document.getElementById("merge-sort").disabled=false;
        document.getElementById("bubble-sort").disabled=false;
    }
    if(m===true)
    {
        let pairs= new Array();
        for(let i=0;i<randoms.length;i++)
        {
            let pair= new Pair(randoms[i],indexes[i]-1);
            pairs[i]=pair;
        }

        let sortedPairs=await mergeSortFunction(pairs);
        showButtonsMerge();
    }
}

async function showButtonsMerge(){
    document.getElementById("generate-array").disabled=false;
    document.getElementById("myRange").disabled=false;
    document.getElementById("insertion-sort").disabled=false;
    document.getElementById("selection-sort").disabled=false;
    document.getElementById("quick-sort").disabled=false;
    document.getElementById("bubble-sort").disabled=false;
}

bubbleSort.onclick= function(){
    document.getElementById("bubbleVisibility").style.visibility="visible";
    document.getElementById("insertionVisibility").style.visibility="hidden";
    document.getElementById("selectionVisibility").style.visibility="hidden";
    document.getElementById("quickVisibility").style.visibility="hidden";
    document.getElementById("mergeVisibility").style.visibility="hidden";
    b=true;
    i=false;
    s=false;
    q=false;
    m=false;
    document.getElementById("sort").style.visibility = "visible";
}

insertionSort.onclick=function(){
    document.getElementById("bubbleVisibility").style.visibility="hidden";
    document.getElementById("insertionVisibility").style.visibility="visible";
    document.getElementById("selectionVisibility").style.visibility="hidden";
    document.getElementById("quickVisibility").style.visibility="hidden";
    document.getElementById("mergeVisibility").style.visibility="hidden";
    b=false;
    i=true;
    s=false;
    q=false;
    m=false;
    document.getElementById("sort").style.visibility = "visible";
}

selectionSort.onclick=function(){
    document.getElementById("bubbleVisibility").style.visibility="hidden";
    document.getElementById("insertionVisibility").style.visibility="hidden";
    document.getElementById("selectionVisibility").style.visibility="visible";
    document.getElementById("quickVisibility").style.visibility="hidden";
    document.getElementById("mergeVisibility").style.visibility="hidden";
    b=false;
    i=false;
    s=true;
    q=false;
    m=false;
    document.getElementById("sort").style.visibility = "visible";
}

quickSort.onclick=function(){
    document.getElementById("bubbleVisibility").style.visibility="hidden";
    document.getElementById("insertionVisibility").style.visibility="hidden";
    document.getElementById("selectionVisibility").style.visibility="hidden";
    document.getElementById("quickVisibility").style.visibility="visible";
    document.getElementById("mergeVisibility").style.visibility="hidden";
    b=false;
    i=false;
    s=false;
    q=true;
    m=false;
    document.getElementById("sort").style.visibility = "visible";
}

mergeSort.onclick=function(){
    document.getElementById("bubbleVisibility").style.visibility="hidden";
    document.getElementById("insertionVisibility").style.visibility="hidden";
    document.getElementById("selectionVisibility").style.visibility="hidden";
    document.getElementById("quickVisibility").style.visibility="hidden";
    document.getElementById("mergeVisibility").style.visibility="visible";
    b=false;
    i=false;
    s=false;
    q=false;
    m=true;
    document.getElementById("sort").style.visibility = "visible";
}

async function selectionSortFunction(array){
    document.getElementById("generate-array").disabled=true;
    document.getElementById("myRange").disabled=true;
    document.getElementById("quick-sort").disabled=true;
    document.getElementById("insertion-sort").disabled=true;
    document.getElementById("merge-sort").disabled=true;
    document.getElementById("bubble-sort").disabled=true;
    for(let i=0;i<array.length;i++)
    {
        let minInd=i;
        await changeBarColor("#007bff",minInd,speed);
        for(let j=i+1;j<array.length;j++)
        {
            await changeBarColor("#7FFFD4",j,speed);
            if(array[j]<array[minInd])
            {
                await changeBarColor(undefined,minInd,speed);
                minInd=j;
            }
            await changeBarColor("#007bff",minInd,speed);
            await changeBarColor(undefined,j,speed);
        }
        swap(array,i,minInd);
        await changeBarColor(undefined,minInd,speed);
        await changeBarColor("#28a745",i,speed);
    }
    document.getElementById("generate-array").disabled=false;
    document.getElementById("myRange").disabled=false;
    document.getElementById("quick-sort").disabled=false;
    document.getElementById("insertion-sort").disabled=false;
    document.getElementById("merge-sort").disabled=false;
    document.getElementById("bubble-sort").disabled=false;
    return array;
}

async function insertionSortFunction(array){
    document.getElementById("generate-array").disabled=true;
    document.getElementById("myRange").disabled=true;
    document.getElementById("quick-sort").disabled=true;
    document.getElementById("selection-sort").disabled=true;
    document.getElementById("merge-sort").disabled=true;
    document.getElementById("bubble-sort").disabled=true;
    for(let i=1;i<array.length;i++)
    {
        await changeBarColor("#007bff",i,speed);
        let key=array[i];
        let j=i-1;

        while(j>=0&&array[j]>key)
        {
            await changeBarColor("#7FFFD4",j,speed);
            array[j+1]=array[j];
            j=j-1;
        }
        array[j+1]=key;
        await changeBarColor(undefined,i,speed);
        await changeBarColor("#28a745",i,speed);
    }
    for(let i=0;i<array.length;i++)
    {
        await changeBarColor("#28a745",i,1);
    }
    chart.update(0);
    document.getElementById("generate-array").disabled=false;
    document.getElementById("myRange").disabled=false;
    document.getElementById("quick-sort").disabled=false;
    document.getElementById("selection-sort").disabled=false;
    document.getElementById("merge-sort").disabled=false;
    document.getElementById("bubble-sort").disabled=false;
    return array;
}

async function quickSortFunction(arr, left, right){
    document.getElementById("generate-array").disabled=true;
    document.getElementById("myRange").disabled=true;
    document.getElementById("insertion-sort").disabled=true;
    document.getElementById("selection-sort").disabled=true;
    document.getElementById("merge-sort").disabled=true;
    document.getElementById("bubble-sort").disabled=true;
    let len = arr.length, pivot, partitionIndex;
 
    if(left < right)
    {
        pivot = right;
        partitionIndex =await partition(arr, pivot, left, right);

        await quickSortFunction(arr, left, partitionIndex - 1);
        let sorted=true;
        for(let i=left+1;i<pivot;i++)
        {
            if(arr[i]<arr[i-1])
                sorted=false;
        }
        if(sorted===true)
        {
            for(let i=0;i<partitionIndex;i++)
            {
                chart.data.datasets[0].backgroundColor[i]="#28a745";
                await sleep(speed/2);
                chart.update(0);
            }
            chart.update(0);
        }
        await quickSortFunction(arr, partitionIndex + 1, right);
    }
    for(let i=0;i<right+1;i++)
    {
            chart.data.datasets[0].backgroundColor[i]="#28a745";
    }
    chart.update(0)
    return arr;
}

async function partition(arr, pivot, left, right){
    
    let pivotValue = arr[pivot];
    console.log(pivotValue);
    let partitionIndex = left;
    changeBarColor("#007bff",pivot,speed);
    await sleep(speed);
    for(var i = left; i < right; i++)
    {
        changeBarColor("#7FFFD4",partitionIndex,speed);
        await sleep(speed);
        changeBarColor("#7FFFD4",i,speed);
        await sleep(speed);
        changeBarColor(undefined,i,speed);
        await sleep(speed);
        changeBarColor(undefined,partitionIndex,speed);
        await sleep(speed*10);
        if(arr[i] < pivotValue)
        {
            swap(arr, i, partitionIndex);
            partitionIndex++;
        }
   }
   changeBarColor(undefined,pivot,speed);
   await sleep(speed);
   swap(arr, right, partitionIndex);
   return partitionIndex;
}

function swap(arr, i, j){
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

async function mergeSortFunction(array){
    document.getElementById("generate-array").disabled=true;
    document.getElementById("myRange").disabled=true;
    document.getElementById("insertion-sort").disabled=true;
    document.getElementById("selection-sort").disabled=true;
    document.getElementById("quick-sort").disabled=true;
    document.getElementById("bubble-sort").disabled=true;

    if(array.length<2)
        return array;

    const middle=Math.floor(array.length/2);
    const leftSide=array.slice(0,middle);
    const rightSide=array.slice(middle,array.length);

    return merge(await mergeSortFunction(leftSide),await mergeSortFunction(rightSide));
}

async function merge(left,right){
    let result=new Array();
    
    while(left.length&&right.length)
    {
        chart.data.datasets[0].backgroundColor[left[0].ind]="#007bff";
        chart.update(0);
        await sleep(speed);
        chart.data.datasets[0].backgroundColor[right[0].ind]="007bff";
        chart.update(0);
        await sleep(speed);
        chart.data.datasets[0].backgroundColor[left[0].ind]="#7FFFD4";
        chart.update(0);
        await sleep(speed);
        chart.data.datasets[0].backgroundColor[right[0].ind]="#7FFFD4";
        chart.update(0);
        await sleep(speed);
    
        if(left[0].num<=right[0].num)
        {
            chart.data.datasets[0].backgroundColor[left[0].ind]="#7FFFD4";
            chart.update(0);
            await sleep(speed);
            result.push(left.shift());
        }
        else
        {
            chart.data.datasets[0].backgroundColor[right[0].ind]="#7FFFD4";
            chart.update(0);
            await sleep(speed);
            chart.data.datasets[0].data[left[0].ind]=right[0].num;
            chart.data.datasets[0].data[right[0].ind]=left[0].num;
            chart.update(0);
            let aux=left[0].ind;
            left[0].ind=right[0].ind;
            right[0].ind=aux;
            result.push(right.shift());
        }
    }

    while(left.length)
    {
        chart.data.datasets[0].backgroundColor[left[0].ind]="#7FFFD4";
        chart.update(0);
        await sleep(speed);
        result.push(left.shift());
    }
    while(right.length)
    {    
        chart.data.datasets[0].backgroundColor[right[0].ind]="#7FFFD4";
        chart.update(0);
        await sleep(speed);
        result.push(right.shift());
    }

    for(let i=0;i<result.length;i++)
    {
        for(let j=0;j<result.length;j++)
        {
            if(result[i].ind<result[j].ind)
            {
                chart.data.datasets[0].backgroundColor[result[i].ind]="#28a745";
                chart.update(0);
                await sleep(speed);
                chart.data.datasets[0].backgroundColor[result[j].ind]="#28a745";
                await sleep(speed);
                chart.update(0);
                await sleep(speed);
                chart.data.datasets[0].data[result[i].ind]=result[j].num;
                chart.data.datasets[0].data[result[j].ind]=result[i].num;
                chart.update(0);
                let aux=result[i].ind;
                result[i].ind=result[j].ind;
                result[j].ind=aux;
            }
            
        }
    }

    return result;
}

async function bubbleSortFunction(array){
    document.getElementById("generate-array").disabled=true;
    document.getElementById("myRange").disabled=true;
    document.getElementById("insertion-sort").disabled=true;
    document.getElementById("selection-sort").disabled=true;
    document.getElementById("quick-sort").disabled=true;
    document.getElementById("merge-sort").disabled=true;
    for(let i=0;i<chart.data.datasets[0].data.length;i++)
    {
        changeBarColor("#007bff",i,speed);
        for(let j=i+1;j<chart.data.datasets[0].data.length;j++)
        {
            changeBarColor("#007bff",j,speed);
            await sleep(speed);
            changeBarColor(undefined,j,speed);
            if(chart.data.datasets[0].data[i]>chart.data.datasets[0].data[j])
            {   
                  switchTwoBars(i,j);
            }
        }
        changeBarColor("#28a745",i,speed);
    }
    document.getElementById("generate-array").disabled=false;
    document.getElementById("myRange").disabled=false;
    document.getElementById("insertion-sort").disabled=false;
    document.getElementById("selection-sort").disabled=false;
    document.getElementById("quick-sort").disabled=false;
    document.getElementById("merge-sort").disabled=false;
    return array;
}

async function changeBarColor(color,bar,speed){
    chart.data.datasets[0].backgroundColor[bar]=color;
    await sleep(speed);
    chart.update(0);
}

function switchTwoBars(i,j){
    let aux=chart.data.datasets[0].data[i];
    chart.data.datasets[0].data[i]=chart.data.datasets[0].data[j];
    chart.data.datasets[0].data[j]=aux; 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createChart(indexes,randoms){
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: indexes,
            datasets: [{
                data: randoms,
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            events:['none'],
            legend:{
                display:false
            },
            layout: {
                padding: {
                    left: 0,
                    right: 10,
                    top: 20,
                    bottom: 0
                }
            }
        }
    });
    return myChart;
}

function arrayOfRandomNumbers(length){
    let randoms=[];
    for(let i=0;i<length;i++)
    {
        randoms.push(randomIntFromInterval(5,1000));
    }
    return randoms;
}

function arrayOfIndices(length){
    let indices=[];
    for(let i=0;i<length;i++)
    {
        indices.push(i+1);
    }
    return indices;
}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

