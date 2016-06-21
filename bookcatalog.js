var fs = require('fs');
var filename , input , input_tag , isbn_no , price , author , title , publisher , pages ;

var inp_flg = input();
if(inp_flg == 0){
	return;
}
var valid = validation();
if (valid == 0) {
	return;
}
mainbookcatalog();
function input(){
		var userinput = process.argv.slice(2,process.argv.length);
		if(userinput[0]=="--help" || userinput[1]=="--help" || userinput[2]=="--help"){
			var text = fs.readFileSync("helpBookCatalog.txt",'utf-8'); // filename is replaced by helpBookCatalog to show instant help to user
			console.log(text);
			return 0;
		}
if(userinput[2]==undefined || userinput[3]==undefined || userinput[4]==undefined || userinput[5]==undefined || userinput[6]==undefined||userinput[7]==undefined )
	{
		console.log("FIRST WRITE ALL INFORMATION REGARDING BOOK STORAGE");
		console.log("INFORMATION SHOULD BE IN ORDER OF :: ISBN_NO PRICE AUTHOR TITLE PUBLISHER PAGES ");
		console.log("For more info type --help ");
		return 0;
	}
		filename = userinput[0];
		input_tag = userinput[1];
		isbn_no = userinput[2];
		price = userinput[3];
		author = userinput[4];
		title = userinput[5];
		publisher = userinput[6];
		pages = userinput[7];
}

function validation() {
		if(!fs.existsSync(filename))
			{  if(filename == undefined){
				console.log("Enter the file name to be include :: for more info type --help");
				return 0;
			}
			else{
			 	console.log ("No such file or directory");
			 	return 0;
			}
}
}

function mainbookcatalog() {
	if(input_tag == "-add"){
		addCatalog();
		return;
	}

	else if(input_tag == "-show"){
		readCatalog();
		return;
	}

	// else if(input_tag == "-update"){
	// 	updateCatalog();
	// 	return;
	// }

	else if(input_tag == "-delete"){
		deleteCatalog();
		return;
	}

	else{
		console.log("INVALID INPUT ENTERED :: for more info type --help ");
		return;
	}
}
function addCatalog() {
	fs.appendFileSync(filename,isbn_no+"\t"+price+"\t"+author+"\t"+title+"\t"+publisher+"\t"+pages+"\n",'utf-8');
	return;
}

function deleteCatalog() {
	if(isbn_no==undefined){
		console.log("Enter the ISBN Number of BooK to be delete in file ");
		return;
	}

	var refrence_var,word_array,count=0;
	var text = fs.readFileSync(filename,'utf-8');
	var line_array = text.split("\n");
	for (var i = 0; i < line_array.length-1; i++) {
		word_array=line_array[i].split("\t");
		if (word_array[0]==isbn_no){
			count++;
			refrence_var=i;
		}
	}

	if (count == 0) {
		console.log("ISBN Number not found in File :: for more info type --help");
		return;
	}
	else{
		fs.writeFileSync(filename,"",'utf-8');
		for (var i = 0; i < line_array.length-1; i++) {
			if(i==refrence_var){
				continue;
			}
			fs.appendFileSync(filename,line_array[i]+"\n",'utf-8');
		}
	}

}


function readCatalog(){
	var text =fs.readFileSync(filename,'utf-8');
	console.log(text);
}