import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from './../../services/categories.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsObservable = new Observable<any[]>();
  categoriesObservable = new Observable<any[]>();
  // below is another way to write above code
  // public productObservable: Observable<any[]> = new Observable();
  // public categoryObservable: Observable<any[]> = new Observable();  

  constructor(private productsService : ProductsService, private categoriesService : CategoriesService, private modalService : NgbModal, private formBuilder: FormBuilder) { }  

  productForm: FormGroup = new FormGroup({});
  productModel: Products | undefined;

  selectedImageIdx: number = 0;
  thumbnailImageIdx: number = 0;

  tempImageFiles: any[] = [];

  updation: boolean = false;
  loader: boolean = false;  


  ngOnInit(): void {
    this.productsObservable = this.productsService.getProducts();
    this.categoriesObservable = this.categoriesService.getCategories();
  }

  openModal(modal: any, product: Products | null = null){
    this.tempImageFiles = [];    
    this.initializeModal(product);
    this.modalService.open(modal, { size: "xl" });
  }

  openImageModal(modal: any, imageUrls: string[], thumbnailImageIdx: number) {
  this.tempImageFiles = [...imageUrls];
  this.thumbnailImageIdx = thumbnailImageIdx;
  this.modalService.open(modal, { 
    size: "xl",
    scrollable: true 
  });
  }
  
  openImage(url: string) {
    window.open(url, "_blank")
  }

  viewProductDetails(modal: any, productObj: Products) {
    this.productModel = productObj;
    this.modalService.open(modal, { size: 'lg' });
  }

  initializeModal(productObj: Products | null) {
    if (productObj == null) {
      this.updation = false;
      this.productForm = this.formBuilder.group({
        productId: [],
        productTitle: [null],
        price: [null],
        images: this.formBuilder.array([]),
        thumbnailImage: [null],
        productDescription: [null],
        productCategory: [null],
        active: [true],
        addedOn: [],
        rating: [0]
      });
    } else {
      this.updation = true;
      this.productForm = this.formBuilder.group({
        productId: [productObj.productId],
        productTitle: [productObj.productTitle],
        price: [productObj.price],
        images: [productObj.images],
        thumbnailImage: [productObj.thumbnailImage],
        productDescription: [productObj.productDescription],
        productCategory: [productObj.productCategory],
        active: [productObj.active],
        addedOn: [productObj.addedOn],
        rating: [productObj.rating]
      });
      this.onSelectOption(productObj.productCategory);
      this.tempImageFiles = productObj.images || [];
    }
  }

  onSelectOption(category: Category | Event | undefined) {
    // this.productForm.patchValue({
    //   category: this.categories.find(x => x.categoryId === category.categoryId)
    // })
  }

  checkImageFileType(event: any) {
    let fileList: File[] = Object.assign([], event.target.files);
    fileList.forEach((file: any, idx: number) => {
      if (
        file.type == "image/png" ||
        file.type == "image/jpeg" ||
        file.type == "image/jpg"
      ) {
        this.tempImageFiles.push(file);
      } else {
        // this.toast.warning("Only .png/.jpeg/.jpg file format accepted!!", file.name + " will not accepted.");
      }
    });
  }


  removeImage(idx: number) {
    this.tempImageFiles.splice(idx, 1);
  }

  changeThumbnailImageIdx(idx: number) {
    this.productForm.patchValue({
      thumbnailImage: idx
    })
  }

  compareByCategoryId(category1: Category, category2: Category) {
    return category1 && category2 && category1.categoryId === category2.categoryId;
  }
  
}


export interface Products {
  productId?: string;
  productTitle?: string;
  productCode?: string;
  productDescription?: string;
  price?: number;
  productCategory?: Category;
  images?: string[];
  thumbnailImage?: number;
  active?: boolean;
  addedOn?: Date;
  rating?: number;
}

export interface Category {
  categoryId?: string;
  categoryName?: string;
  categoryDescription?: string;
  categoryImageUrl?: string;
  createdOn?: Date;
  active?: boolean;
}