import UserService, { User } from "../user/service";
import ProductService, { Product } from "../product/service";
import OrderService from "../order/service";


    describe("Testing user models", () => {
        test("Get by Id",async () => {
            const result = await UserService.getById("1");
            expect(result).toBeDefined()
        });
        test("Try to get User by Id with wrong Id",async () => {
            const result = await UserService.getById("9999");
            expect(result).toBeUndefined()
        })
        test("Get All",async () => {
            const result = await UserService.getAll();
            expect(typeof(result)).toBe("object");
        })
        test("Try to get password",async () => {
            const user: User = {
                firstname: "Admin",
                lastname: "Admin",
                password: "admin"
            };
            const result = await UserService.getPassword(user);
            expect(result).not.toBeNull()
        })
        test("Try to get password with wrong password",async () => {
            const user: User = {
                firstname: "Admin",
                lastname: "Admin",
                password: "admn"
            };
            const result = await UserService.getPassword(user);
            expect(result).toBeNull()
        })
        test("try creating new User",async () => {
            const user: User = {
                firstname: "exampleFirstname",
                lastname: "exampleLastname",
                password: "examplepw",
            }
            const result = await UserService.newUser(user);
            expect(result).toStrictEqual([]) 
        });
    })
    describe("Testing products models", () => {
        test("Get all Products",async () => {
            const result = await ProductService.getAllProducts();
            expect(result).toBeDefined();
        });
        test("Get product by Id",async () => {
            const result = await ProductService.getById("1");
            expect(result).not.toBeNull();
        });
        test("Get product by not existing id", async () =>{
            const result = await ProductService.getById("999");
            expect(result).toBeNull();
        })
        test("Create a Product", async () => {
            const product: Product = {
                product_name: "exampleProduct",
                product_price: 729,
                product_category: "example"
            }
            const result = await ProductService.createProductQuery(product)
            expect(result).toStrictEqual([]);
        });
        describe("Testing order models", () => {
            test("get current order",async () => {
            const result = await OrderService.getCurrentOrder("1");
            expect(result).not.toBeNull();
        });
        test("get not existing current order",async () => {
            const result = await OrderService.getCurrentOrder("999");
            expect(result).toBeNull();
        });
        });
    })