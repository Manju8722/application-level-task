import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Product,
  ProductCategory,
  ProductCategoryEnum,
  ProductStatus,
  ProductStatusEnum,
} from "@/server/utils";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Eye,
  Heart,
  Package,
  Palette,
  ShoppingCart,
  Star,
  Tag,
  User,
} from "lucide-react";
import Image from "next/image";

const getStatusColor = (status: ProductStatus) => {
  switch (status) {
    case ProductStatusEnum.ACTIVE:
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-400/10";
    case ProductStatusEnum.INACTIVE:
      return "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400 dark:bg-amber-400/10";
    case ProductStatusEnum.ARCHIVED:
      return "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400 dark:bg-slate-400/10";
    case ProductStatusEnum.OUT_OF_STOCK:
      return "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400 dark:bg-red-400/10";
    case ProductStatusEnum.DISCONTINUED:
      return "bg-gray-500/10 text-gray-600 border-gray-500/20 dark:text-gray-400 dark:bg-gray-400/10";
    case ProductStatusEnum.PENDING:
      return "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400 dark:bg-orange-400/10";
    case ProductStatusEnum.DRAFT:
      return "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400 dark:bg-indigo-400/10";
    case ProductStatusEnum.HIDDEN:
      return "bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400 dark:bg-violet-400/10";
    case ProductStatusEnum.DELETED:
      return "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400 dark:bg-rose-400/10";
    default:
      return "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400 dark:bg-blue-400/10";
  }
};

const getCategoryColor = (category: ProductCategory) => {
  switch (category) {
    case ProductCategoryEnum.ELECTRONICS:
      return "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400 dark:bg-blue-400/10";
    case ProductCategoryEnum.MOBILES:
      return "bg-cyan-500/10 text-cyan-600 border-cyan-500/20 dark:text-cyan-400 dark:bg-cyan-400/10";
    case ProductCategoryEnum.COMPUTERS:
      return "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400 dark:bg-purple-400/10";
    case ProductCategoryEnum.FASHION:
      return "bg-pink-500/10 text-pink-600 border-pink-500/20 dark:text-pink-400 dark:bg-pink-400/10";
    case ProductCategoryEnum.HOME_KITCHEN:
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-400/10";
    case ProductCategoryEnum.SPORTS:
      return "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400 dark:bg-red-400/10";
    case ProductCategoryEnum.BOOKS:
      return "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400 dark:bg-orange-400/10";
    case ProductCategoryEnum.GROCERIES:
      return "bg-lime-500/10 text-lime-600 border-lime-500/20 dark:text-lime-400 dark:bg-lime-400/10";
    case ProductCategoryEnum.TOYS:
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400 dark:bg-yellow-400/10";
    case ProductCategoryEnum.BEAUTY:
      return "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20 dark:text-fuchsia-400 dark:bg-fuchsia-400/10";
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-500/20 dark:text-gray-400 dark:bg-gray-400/10";
  }
};
export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card
      className="group py-0 pb-3 relative overflow-hidden border border-slate-200/30 
  bg-gradient-to-br from-white/95 via-slate-50/70 to-blue-50/40 
  dark:from-slate-900/70 dark:via-slate-800/60 dark:to-slate-900/80 
  backdrop-blur-sm 
  hover:from-white hover:to-blue-100/70 dark:hover:from-slate-800/70 dark:hover:to-slate-700/60 
  transition-all duration-500 
  hover:scale-[1.01] sm:hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 
  w-full max-w-full sm:max-w-sm mx-auto rounded-2xl"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Product Image Section */}
      <div className="relative h-28 xs:h-32 sm:h-40 md:h-48 overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200/80 to-slate-300/60 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
          {product.images && product.images.length > 0 ? (
            <div className="relative w-full h-44 xs:h-56 sm:h-80 md:h-96 lg:h-[500px]">
              <Image
                src={product.images[0] || "https://picsum.photos/800/600"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 rounded-xl"
              />
            </div>
          ) : (
            <Package className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 text-slate-500/70 dark:text-slate-400" />
          )}
        </div>

        {/* Status Badge */}
        <Badge
          className={`absolute top-2 right-2 xs:top-3 xs:right-3 ${getStatusColor(
            product.status
          )} font-medium border border-white/30 dark:border-slate-600/40 backdrop-blur-md shadow-lg text-[10px] xs:text-xs`}
        >
          {product.status}
        </Badge>

        {/* Action Buttons */}
        <div className="absolute top-2 left-2 xs:top-3 xs:left-3 flex gap-1 xs:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Button
            size="sm"
            variant="outline"
            className="h-7 w-7 xs:h-8 xs:w-8 p-0 bg-white/30 dark:bg-black/30 border-white/40 dark:border-slate-600/60 backdrop-blur-md hover:bg-white/50 dark:hover:bg-black/50 shadow-md"
          >
            <Heart className="h-3.5 w-3.5 xs:h-4 xs:w-4 text-slate-700 dark:text-slate-200" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 w-7 xs:h-8 xs:w-8 p-0 bg-white/30 dark:bg-black/30 border-white/40 dark:border-slate-600/60 backdrop-blur-md hover:bg-white/50 dark:hover:bg-black/50 shadow-md"
          >
            <Eye className="h-3.5 w-3.5 xs:h-4 xs:w-4 text-slate-700 dark:text-slate-200" />
          </Button>
        </div>

        {/* Stock indicator */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-1 left-1 xs:bottom-2 xs:left-2">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-[9px] xs:text-[10px] sm:text-xs px-1 py-0.5 shadow-lg">
              Only {product.stock} left!
            </Badge>
          </div>
        )}
      </div>

      {/* Header */}
      <CardHeader className="relative pb-2 px-2 xs:px-3 sm:px-4">
        <div className="flex items-start justify-between gap-1 xs:gap-2">
          <CardTitle className="text-lg xs:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-100 transition-colors line-clamp-1">
            {product.name}
          </CardTitle>
          <div className="flex items-center gap-0.5 xs:gap-1 text-yellow-500 dark:text-yellow-400">
            <Star className="w-3.5 h-3.5 xs:w-4 xs:h-4 fill-current" />
            <span className="text-xs xs:text-sm font-medium">4.5</span>
          </div>
        </div>

        {/* Category and Vendor */}
        <div className="flex items-center gap-1.5 xs:gap-2 mt-1 xs:mt-2 flex-wrap">
          <Badge
            className={`${getCategoryColor(
              product.category
            )} text-[10px] xs:text-xs font-medium border border-slate-200 dark:border-slate-600 shadow-sm`}
          >
            <Tag className="w-2.5 h-2.5 xs:w-3 xs:h-3 mr-0.5 xs:mr-1" />
            {product.category}
          </Badge>
          <Badge
            variant="outline"
            className="text-[10px] xs:text-xs text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700/40"
          >
            <User className="w-2.5 h-2.5 xs:w-3 xs:h-3 mr-0.5 xs:mr-1" />
            {product.vendor}
          </Badge>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="relative pb-3 px-2 xs:px-3 sm:px-4">
        {product.description && (
          <CardDescription className="text-slate-700 dark:text-slate-400 text-xs xs:text-sm line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </CardDescription>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl xs:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
            <span className="text-[11px] xs:text-sm text-slate-500 dark:text-slate-500 line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-0.5 text-slate-600 dark:text-slate-400 text-xs xs:text-sm">
            <Package className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
            <span className="font-medium">{product.stock} in stock</span>
          </div>
        </div>

        {(product.createdAt || product.updatedAt) && (
          <div className="flex items-center gap-3 text-[10px] xs:text-xs text-slate-500 dark:text-slate-400 border-t border-slate-300/60 dark:border-slate-700/50 pt-2">
            {product.createdAt && (
              <div className="flex items-center gap-0.5">
                <Calendar className="w-3 h-3" />
                <span>
                  Added {new Date(product.createdAt)?.toLocaleDateString()}
                </span>
              </div>
            )}
            {product.updatedAt && (
              <div className="flex items-center gap-0.5">
                <Palette className="w-3 h-3" />
                <span>Updated {product.updatedAt.toLocaleDateString()}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="relative pt-0 px-2 xs:px-3 sm:px-4">
        <div className="flex gap-2 w-full">
          <Button
            className="flex-1 text-xs xs:text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={product.status === ProductStatusEnum.OUT_OF_STOCK}
          >
            <ShoppingCart className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
            {product.status === ProductStatusEnum.OUT_OF_STOCK
              ? "Out of Stock"
              : "Add to Cart"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 xs:h-9 xs:w-9 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300 transition-all duration-300"
          >
            <Heart className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// // Demo component with sample data
// const ProductCardDemo = () => {
//   const sampleProducts: Product[] = [
//     {
//       id: 1,
//       name: "Premium Wireless Headphones",
//       price: 299.99,
//       stock: 15,
//       category: ProductCategory.Electronics,
//       description:
//         "Experience crystal-clear audio with our latest wireless headphones featuring active noise cancellation and 30-hour battery life.",
//       images: [
//         "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
//       ],
//       vendor: "AudioTech Pro",
//       status: ProductStatus.Active,
//       createdAt: new Date("2024-01-15"),
//       updatedAt: new Date("2024-02-10"),
//     },
//     {
//       id: 2,
//       name: "Smart Fitness Watch",
//       price: 199.99,
//       stock: 3,
//       category: ProductCategory.Electronics,
//       description:
//         "Track your health and fitness goals with this advanced smartwatch featuring GPS, heart rate monitoring, and 7-day battery life.",
//       images: [
//         "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
//       ],
//       vendor: "FitTech Solutions",
//       status: ProductStatus.Active,
//       createdAt: new Date("2024-02-01"),
//       updatedAt: new Date("2024-02-15"),
//     },
//     {
//       id: 3,
//       name: "Organic Cotton T-Shirt",
//       price: 29.99,
//       stock: 0,
//       category: ProductCategory.Clothing,
//       description:
//         "Comfortable and sustainable organic cotton t-shirt available in multiple colors and sizes.",
//       images: [
//         "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
//       ],
//       vendor: "EcoWear",
//       status: ProductStatus.OutOfStock,
//       createdAt: new Date("2024-01-20"),
//       updatedAt: new Date("2024-02-12"),
//     },
//   ];

//   return (

// };

// export default ProductCardDemo;
