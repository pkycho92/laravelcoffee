<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 11 Jun 2019 23:16:12 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class About
 * 
 * @property int $id
 * @property string $description
 * @property string $image
 * @property string $name
 * @property int $position
 *
 * @package App\Models
 */
class About extends Eloquent
{
	protected $table = 'about';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'position' => 'int'
	];

	protected $fillable = [
		'description',
		'image',
		'name',
		'position'
	];
}
