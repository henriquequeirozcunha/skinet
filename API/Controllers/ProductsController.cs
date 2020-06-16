using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repo;
        public ProductsController(IProductRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _repo.GetProductsAsyc();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Product>>> GetProduct(int id)
        {
            var products = await _repo.GetProductByIdAsync(id);

            return Ok(products);
        }
         [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            var products = await _repo.GetProductBrandsAsyc();

            return Ok(products);
        }
         [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProductTypes()
        {
            var products = await _repo.GetProductTypesAsyc();

            return Ok(products);
        }
    }
}