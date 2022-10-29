import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoriesObservable = new Observable<any[]>();
  // below is another way to write above code
  // public categoryObservable: Observable<any[]> = new Observable();
  
  prodCategoryBool: boolean = true;

  productCategoryForm: FormGroup = new FormGroup({});
  loader: boolean = false;
  tempFile: any;

  constructor(private categoriesService : CategoriesService, private modalService : NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.categoriesObservable = this.categoriesService.getCategories();
  }

  openProductCategoryDialog(modalRef:any, productCategoryObj = null){
    //console.log(productCategoryObj);
    this.initialForm(productCategoryObj);
    this.modalService.open(modalRef);
  }

  // initialize forms
  initialForm(productCategoryObj: any = null){
    if (productCategoryObj === null){
      this.productCategoryForm = this.formBuilder.group({
        categoryName: ["", Validators.required],
        categoryDescription: ["", Validators.required],
        categoryImageUrl: ["", Validators.required],
        categoryId: [null],
        active: [true],
        addedOn: [],
      });
    }else{
      this.productCategoryForm = this.formBuilder.group({
        categoryName: [productCategoryObj.categoryName, Validators.required],
        categoryDescription: [productCategoryObj.categoryDescription, Validators.required],
        categoryImageUrl: [productCategoryObj.categoryImageUrl, Validators.required],
        categoryId: [productCategoryObj.categoryId],
        active: [productCategoryObj.active],
      });
    }
  }

  checkFileType(event: any){
    this.tempFile = event.target.files[0];
    if(
      this.tempFile.type == "image/png" ||
      this.tempFile.type == "image/jpeg" ||
      this.tempFile.type == "image/jpg"
    ) {
      // console.log("File Ok");
    } else {
      // console.log("File Not Ok");
      this.tempFile = null;
      // this.toast.show("Only .png/.jpeg/.jpg file format accepted!!") 
    }
  }

}