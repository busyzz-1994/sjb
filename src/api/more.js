import _mm from 'util/mm.js';

const moreApi = {
    getNameByCode:function(code,success){
		$.ajax({
			type:"get",
			url:"https://restapi.amap.com/v3/config/district",
			async:true,
			data:{
				key:'75a8f36ecc9bad56a53074718fe868a5',
				keywords:code
			},
			success:function(data){
				var name = data.districts[0].name;
				success(name);
			}
		});
	}
}

export default moreApi;