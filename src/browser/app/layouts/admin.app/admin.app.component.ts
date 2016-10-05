import template from './admin.app.html!text';


let adminComponent = ()=>{
	return {
		template, // because we have a variable name template we can use the shorcut here
		restrict: 'E'
	};
};

export {adminComponent};
